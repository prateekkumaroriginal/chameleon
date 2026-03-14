<p align="center">
  <img src="src/assets/icon-128.png" width="80" alt="Chameleon Logo" />
</p>

<h1 align="center">Chameleon</h1>

<p align="center">
  <strong>A modern Chrome extension for injecting custom CSS into any webpage.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Manifest-V3-blue?style=flat-square" alt="Manifest V3" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite" alt="Vite 7" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind v4" />
</p>

---

# ✨ Features

- **Per-Domain CSS Injection** — Create CSS rules that apply only to specific domains
- **Popup Quick Controls** — Toggle rules on/off directly from the popup for the current site
- **Full Options Page** — Create, edit, and manage all your CSS rules in a dedicated settings page
- **CodeMirror Editor** — Syntax-highlighted CSS editor with line numbers, bracket matching, and one-dark theme
- **Archive System** — Soft-delete rules to an archive before permanent deletion
- **Real-Time Updates** — CSS changes apply instantly without page reload
- **Wildcard Matching** — Use `*` as domain to apply CSS globally across all sites
- **Subdomain Support** — A rule for `example.com` also matches `sub.example.com`

---

# 🏗️ Built With

| | Technology |
|---|---|
| **Framework** | React 19 with React Compiler |
| **Language** | TypeScript 5.9 |
| **Bundler** | Vite 7 + CRXJS |
| **Extension** | Chrome Manifest V3 |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | shadcn/ui (New York style) |
| **Icons** | Lucide React |
| **CSS Editor** | CodeMirror 6 |
| **Router** | React Router DOM v7 |
| **Package Manager** | pnpm |

---

# 🚀 Getting Started

## Installation

### Quick Install (Prebuilt)

1. Download the extension ZIP  
   https://github.com/prateekkumaroriginal/chameleon/releases/download/v1.0.0/chameleon.zip
2. Extract **chameleon.zip**
3. Open `chrome://extensions/` in Chrome
4. Enable **Developer mode** (top-right toggle)
5. Click **Load unpacked**
6. Select the extracted folder

## Build from Source

### Prerequisites

- [Node.js](https://nodejs.org/) 20.19+ or 22.12+
- [pnpm](https://pnpm.io/) 9+
- Google Chrome or Chromium-based browser

```bash
# Clone the repository
git clone https://github.com/prateekkumaroriginal/chameleon.git
cd chameleon

# Install dependencies
pnpm install

# Build the extension
pnpm build

### Load in Chrome

1. Open `chrome://extensions/` in Chrome
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the `dist/` folder from the project
5. The Chameleon icon will appear in your toolbar

### Development

```bash
# Start dev server with HMR
pnpm dev

# Lint the codebase
pnpm lint

# Type-check and build for production
pnpm build
```

> **Note:** When using `pnpm dev`, Chrome will hot-reload the extension automatically via CRXJS.

---

# 📖 Usage

## Creating a CSS Rule

1. Click the **Chameleon** icon in your toolbar → click the **⚙️ Settings** icon
2. Click **New Rule**
3. Fill in:
   - **Name** — A descriptive name for your rule
   - **Domain** — The target domain (e.g., `github.com` or `*` for all sites)
   - **CSS** — Your custom CSS in the code editor
4. Toggle **Enabled** on/off
5. Click **Save**

## Toggling Rules from Popup

- Navigate to any website
- Click the **Chameleon** icon
- Use the **toggle switches** to enable/disable rules for the current domain
- Changes apply instantly — no page reload needed

## Archiving & Deleting Rules

- **Archive**: Edit a rule → click **Archive** (soft delete)
- **Restore**: Go to **Archived** list → click **Restore**
- **Permanent Delete**: Go to **Archived** list → click **Delete** → confirm in dialog

## Domain Matching

| Rule Domain | Matches |
|---|---|
| `github.com` | `github.com` |
| `example.com` | `example.com`, `sub.example.com`, `a.b.example.com` |
| `https://cdn.example.com` | `cdn.example.com` (protocol is stripped automatically) |
| `*` | All websites |

---

# 🧩 Permissions

| Permission | Reason |
|---|---|
| `storage` | Persist CSS rules locally |
| `activeTab` | Read the current tab's URL for domain matching |
| `tabs` | Query tab info from the popup |
| `scripting` | Programmatic script injection support |

---

# 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
