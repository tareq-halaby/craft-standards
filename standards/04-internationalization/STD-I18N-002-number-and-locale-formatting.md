---
id: STD-I18N-002
title: Locale-Aware Numeric Formatting, Decimal Separators, and Measurement Units
category: internationalization
status: active
canonical_crate: craft-libs::craft-i18n
affected_apps: [photocraft, designcraft, effectcraft, vectorcraft, wordcraft]
---

# STD-I18N-002: Locale-Aware Numeric Formatting, Decimal Separators, and Measurement Units

## 1. Abstract
Specifies input parsing and display formatting for numbers, percentages, dimensions, and measurement units across international locales.

---

## 2. Normative Requirements

### 2.1 Decimal Separators
* Parsing numeric fields must accept both period (`.`) and comma (`,`) as valid decimal separators regardless of the current system locale, preventing rejected input when typing.
* Display formatting must follow the user's active locale preferences (e.g. `1,234.56` vs `1.234,56`).

### 2.2 Eastern and Western Arabic Numerals
* In Arabic and Persian locales, applications must allow the user to select whether numerical values in inspectors and rulers display using **Eastern Arabic Numerals** (٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩) or **Western Arabic Numerals** (0 1 2 3 4 5 6 7 8 9).

### 2.3 Measurement Unit Conversion
* Numeric inputs must parse unit suffixes typed by the user (e.g. `12mm`, `5in`, `72pt`, `100px`) and automatically convert them to the document's active unit system using precise standard conversion ratios:
  * $1\text{ in} = 25.4\text{ mm} = 72\text{ pt}$.
