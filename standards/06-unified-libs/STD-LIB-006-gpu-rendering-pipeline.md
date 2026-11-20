---
id: STD-LIB-006
title: Universal GPU Device Lifecycle, Shader Caches & Fallbacks
category: unified-libs
status: active
canonical_crate: craft-libs::craft-gpu
wiki_reference: https://craft.wiki/architecture/gpu/
affected_apps: [photocraft, vectorcraft, lightcraft, designcraft, effectcraft, anicraft, cadcraft, soundcraft]
---

# STD-LIB-006: Universal GPU Device Lifecycle, Shader Caches & Fallbacks

## 1. Abstract

ArtCraft visual and audio applications rely on GPU hardware acceleration for real-time viewport compositing, brush rendering, canvas transforms, and compute shaders. As documented in Storytold `RFC-0022`, disparate implementations of GPU initialization frequently lead to hard crashes when:
1. The operating system enters low-power sleep or displays are disconnected, causing GPU device loss.
2. Software updates update GPU display drivers mid-session.
3. Applications run inside headless CI environments, Docker containers, or virtual machines lacking physical GPU hardware.

This standard establishes the normative contract for GPU adapter acquisition, precompiled WGSL shader caching, graceful `DeviceLost` recovery, and headless software rasterization fallback via `craft-libs::craft-gpu`.

---

## 2. Normative Behavioral Requirements

### 2.1 Backend Selection & Fallback Hierarchy
Applications MUST initialize GPU contexts through `craft_gpu::init_context()` with the following mandatory fallback hierarchy:
1. **Primary Hardware:** Dedicated GPU using modern native backends (Vulkan on Linux/Android, Metal on macOS/iOS, DirectX 12 on Windows).
2. **Integrated Hardware:** Integrated SoC / APU hardware.
3. **Headless / Software Rasterizer:** If physical GPU device acquisition fails (e.g. running in Docker or headless CI without GPU passthrough), the application MUST fall back to CPU software rasterization (e.g. `wgpu::Backends::GL` with Lavapipe or software WARP). The process MUST NOT panic or abort.

### 2.2 Graceful Device Lost Handling
GPU devices can be lost at any moment due to driver crashes, OS sleep cycles, or monitor disconnections.
- Application render loops MUST catch `wgpu::SurfaceError::Lost` and `wgpu::DeviceLost`.
- The engine MUST NOT crash or drop unpersisted document state.
- Upon device loss, the engine MUST pause viewport rendering, flush pending command buffers, reconstruct the `wgpu::Device` and `wgpu::Queue`, re-upload GPU textures and uniform buffers from CPU backup memory, and resume rendering.

### 2.3 Precompiled WGSL Shader Caching
All shader pipelines MUST be authored in standard WebGPU Shading Language (WGSL). Shaders MUST be compiled asynchronously during startup and cached to disk. Viewport interactions MUST NOT stutter or block UI threads for shader compilation during interactive canvas manipulation.

---

## 3. Implementation Invariants (Rust / craft-gpu)

```rust
use std::sync::Arc;

pub struct GpuContext {
    pub instance: wgpu::Instance,
    pub adapter: wgpu::Adapter,
    pub device: Arc<wgpu::Device>,
    pub queue: Arc<wgpu::Queue>,
    pub is_software_fallback: bool,
}

impl GpuContext {
    pub async fn acquire_robust(window_handle: Option<&wgpu::Surface<'_>>) -> Result<Self, String> {
        let instance = wgpu::Instance::default();
        
        // 1. Try high-performance hardware adapter
        let adapter = match instance.request_adapter(&wgpu::RequestAdapterOptions {
            power_preference: wgpu::PowerPreference::HighPerformance,
            compatible_surface: window_handle,
            force_fallback_adapter: false,
        }).await {
            Some(a) => a,
            None => {
                // 2. Fall back to software rasterization adapter
                instance.request_adapter(&wgpu::RequestAdapterOptions {
                    power_preference: wgpu::PowerPreference::LowPower,
                    compatible_surface: window_handle,
                    force_fallback_adapter: true,
                }).await.ok_or_else(|| "No compatible GPU adapter or software fallback found".to_string())?
            }
        };

        let is_software_fallback = adapter.get_info().device_type == wgpu::DeviceType::Cpu;

        let (device, queue) = adapter.request_device(&wgpu::DeviceDescriptor {
            label: Some("ArtCraft Primary Device"),
            required_features: wgpu::Features::empty(),
            required_limits: wgpu::Limits::downlevel_defaults(),
            memory_hints: wgpu::MemoryHints::Performance,
        }, None).await.map_err(|e| format!("GPU device creation failed: {e}"))?;

        Ok(Self {
            instance,
            adapter,
            device: Arc::new(device),
            queue: Arc::new(queue),
            is_software_fallback,
        })
    }
}
```

---

## 4. Verification & Automated Testing

Every graphics application in the ArtCraft suite MUST pass:
1. `test_headless_software_rasterization_fallback`: Tests that running `<app> --headless` on a machine with `WGPU_BACKEND=none` initializes cleanly using software rasterization without panicking.
2. `test_simulated_device_loss_recovers_state`: Simulates device destruction and asserts that document textures reload correctly without losing user edits.
