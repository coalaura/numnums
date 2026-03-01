# Change Log

## [2.0.0]
- Massive performance improvement by caching workspace settings instead of querying them on every hover
- Added explicit `BigInt` support to prevent precision loss on infinitely large integers
- Upgraded hover tooltips to use native VS Code Markdown for a cleaner, polished look
- Added a dynamic Conway-Wechsler magnitude generator supporting natural language output up to 10^3000
- Added a `displayMode` setting to globally toggle between "short" (decimals) and "full" (cascading) formats
- Overhauled `duration` format with 33 accurately scaling time units spanning from Planck time to Kalpas
- Added `length` format with 35 cascading units across Metric, Imperial, and Astronomical scales
- Added `datetime` format to convert Unix timestamps into human-readable local dates
- Added `filePermissions` format to translate integers into Unix chmod strings (e.g., `rwxr-xr-x`)
- Added `color` format to instantly translate raw integers into CSS Hex/RGB values
- Added `currency`, `percentage`, `fraction`, `binary`, `base36`, and `roman` numeral formats
- Upgraded `bytes` format to support Ronnabytes (RB) and Quettabytes (QB)
- Added granular settings for base units, unit labels, timestamp types, and currency codes
- Improved custom separators to intelligently inject based on the user's localized grouping structure
- Fixed a bug where the `^` operator in math expressions evaluated as bitwise XOR instead of exponentiation
- Fixed regex to correctly capture raw hexadecimal, octal, binary, and scientific notation strings

## [1.0.6]
- Fixed some bugs with the expression finder, causing it to match invalid expressions

## [1.0.5]
- Improve expression finder to better find and evaluate expressions

## [1.0.4]
- Properly support languages with built-in number separators like 100_000_000

## [1.0.3]
- Properly support negative numbers
- Dynamically evaluate basic math expressions

## [1.0.2]
- Add some more categories and tags to the package.json

## [1.0.1]
- Add some examples to the README

## [1.0.0]
- Initial release
