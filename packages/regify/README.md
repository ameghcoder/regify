# regify

[![npm version](https://badge.fury.io/js/regify.svg)](https://badge.fury.io/js/regify)
![banner image](https://raw.githubusercontent.com/ameghcoder/regify/main/packages/regify/src/assets/readme-banner.jpg)

**Turn your components into shareable registries.**

`regify` is a powerful CLI tool and programmatic API that transforms your UI components, hooks, and libraries into JSON registries compatible with modern CLI tools (like ShadCN CLI). It automatically handles dependency detection, type classification, and file structure analysis.

## Features

- 🚀 **CLI & Programmatic API**: Use it in your terminal or integrate it into your apps.
- 📂 **Directory & File Support**: Process individual files or entire component directories.
- 🔍 **Smart Dependency Detection**: Automatically identifies NPM and local workspace dependencies.
- 🏷️ **Type Classification**: Detects if a file is a UI component, Hook, Lib, or Style.
- ⚙️ **Configurable**: Use `regify.json` to define output directories and dependency mappings.
- 🛠️ **Built with ts-morph**: High-fidelity analysis of your TypeScript/JavaScript source code.

## Installation

```bash
npm install -g regify
```

## Quick Start (CLI)

1. **Initialize Config**:

   ```bash
   regify init
   ```

2. **Generate Registry**:

   ```bash
   regify generate --input ./src/components/ui/Button.tsx
   ```

## Programmatic Usage

```typescript
import { regify } from "regify";

const result = await regify("./src/components/ui", {
  output: "./registry"
});

console.log(result.message);
```

## License

ISC
