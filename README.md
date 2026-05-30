# GitNexus (HarmonyOS & Precompiled Releases Fork)

[![License: PolyForm Noncommercial](https://img.shields.io/badge/License-PolyForm%20Noncommercial-blue.svg)](https://polyformproject.org/licenses/noncommercial/1.0.0/)
[![Discord](https://img.shields.io/discord/1477255801545429032?color=5865F2&logo=discord&logoColor=white)](https://discord.gg/MgJrmsqr62)

An advanced, graph-powered code intelligence tool and MCP server designed for AI agents. This repository is a specialized fork of the upstream [abhigyanpatwari/GitNexus](https://github.com/abhigyanpatwari/GitNexus) project, optimized for HarmonyOS development and seamless cross-platform deployments.

---

## 🚀 Key Improvements & Features of This Fork

This fork extends the capabilities of GitNexus with unique enhancements tailored for HarmonyOS (ArkTS) projects and portable distribution:

### 1. Robust ArkTS (`.ets`) & `struct` Ingestion Support
* **Zero-Touch Native Parser Adaptation**: Integrates an elegant, high-efficiency `preprocessSource` hook in the parsing pipeline. It dynamically rewrites ArkTS-specific declarative `struct` components to standard JavaScript/TypeScript compatible syntax (`class `) at parse-time.
* **100% Position & Reference Accuracy**: The transformation is strictly **length-preserving**, ensuring all AST node coordinates, column/row positions, and byte offsets remain byte-for-byte identical to the original source. Navigation, call graphs, and impact analysis work with absolute precision.
* **Full Field & Method Extraction**: Automatically indexes ArkTS component fields, decorators (`@Entry`, `@Component`, `@State`, etc.), and lifecycle/render methods (like `build()`) without modifying or re-compiling the native Tree-sitter C++ parser.

### 2. Multi-Platform Precompiled Releases (Portable ZIP/Tarballs)
* **Out-of-the-Box Execution**: Eliminates the need for local C++ native toolchains, Python, or node-gyp builds on user machines.
* **Automated CI Release Pipeline**: On publication of any Git release tag, GitHub Actions compile, package, and bundle GitNexus concurrently across:
  * **Windows** (`gitnexus-windows-x64.zip` + `gitnexus.bat` wrapper)
  * **macOS** (`gitnexus-macos-x64.tar.gz` + `gitnexus` shell wrapper)
  * **Linux** (`gitnexus-linux-x64.tar.gz` + `gitnexus` shell wrapper)
* **Pre-bundled Native Bindings**: Packages all platform-specific native binaries (including `@ladybugdb/core` database engines and `tree-sitter` parsers) as ready-to-run "green portable apps".

### 3. Synchronized with Upstream
* Regularly synced with the main upstream repository to inherit all features, improvements, and performance updates from the base project.

---

## 🛠️ Getting Started

### Connecting to AI Agents via MCP
GitNexus acts as a **Model Context Protocol (MCP)** server, providing deep architectural clarity to AI agents like Cursor, Claude Code, Antigravity, and Codex.

#### Using Precompiled Releases (Recommended)
1. Head to the GitHub Releases page.
2. Download the precompiled archive for your operating system.
3. Extract the files and add the executable wrapper to your agent's MCP configuration:
   ```json
   {
     "mcpServers": {
       "gitnexus": {
         "command": "/path/to/extracted/gitnexus",
         "args": ["serve"]
       }
     }
   }
   ```

#### Developing Locally
```bash
# Clone the repository
git clone https://github.com/JiJunmo/GitNexus.git
cd GitNexus

# Install dependencies (requires native build tools)
cd gitnexus
npm install

# Start CLI in development mode
npm run dev
```

---

## ⚖️ Notices & Licensing

This project is licensed under the **PolyForm Noncommercial License 1.0.0**.

> [!IMPORTANT]
> **Required Notice:** Copyright Abhigyan Patwari (https://github.com/abhigyanpatwari/GitNexus)

This repository is a modified fork. For enterprise SaaS, self-hosted deployments, or commercial inquiries of the base engine, visit the original project homepage or Akon Labs at [akonlabs.com](https://akonlabs.com).
