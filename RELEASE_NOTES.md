### 1.4.0
- Moved as much logic as possible to @uwu/simple-monaco-core
- (`UWU-104`) Added ability to set the file name of the editors (required for TSX to work)
- (`UWU-103`) Added escape hatch to get the editor instance out

### 1.3.0
- (`UWU-100`) Unify theme and loader code into a core package
- (`UWU-105`) Overhaul theme support
  * (`UWU-106`) Fix themes with spaces
  * (`UWU-107`) Allow themes from any place not just `monaco-themes`
- (`UWU-102`) Loader callback before returning to components

### 1.2.0
- Make `otherCfg` reactive
- Add support for Voby (8 months later than other stuff but technically "1.2.0")

### 1.1.0
- Add `noCDN` prop to allow using your own monaco instance

### 1.0.0
- Initial release

(Note this changelog excludes the versions of components pre-monorepo,
when made into a monorepo, versions were reset to 1.0.0)