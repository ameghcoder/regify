# Regify Monorepo

**The Universal Component Registry CLI.** Turn components into shareable registries compatible with shadcn/ui.

## 📁 Structure

This repository is managed as a monorepo using `pnpm` workspaces:

- **`apps/web`**: The official documentation and marketing website for Regify. Built with Next.js and Tailwind CSS.
- **`packages/regify`**: The core CLI package. Responsible for scanning components and generating registry JSON files.

## 🚀 Quick Start

### Local Development

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/ameghcoder/regify.git
    cd regify
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

3.  **Build the CLI**:
    ```bash
    pnpm build --filter regify
    ```

4.  **Run the Documentation site**:
    ```bash
    pnpm dev --filter web
    ```

## 🛠 Features

- **Shadcn Compatibility**: Generates registries that are 100% compliant with the shadcn/ui CLI.
- **Dependency Detection**: Automatically maps and resolves component dependencies.
- **Flexible Configuration**: Use `regify.json` to customize outputs, base paths, and registry mappings.
- **Fast Performance**: Built with `ts-morph` for lightning-fast source analysis.

## 📄 License

This project is licensed under the **ISC License**. See the [LICENSE](./LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue on the [GitHub repository](https://github.com/ameghcoder/regify).

---

Created with ❤️ by [Yashraj](https://x.com/yrjdev)
