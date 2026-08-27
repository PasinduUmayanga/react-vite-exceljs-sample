# ExcelJS Learning Lab

[![Last commit](https://img.shields.io/github/last-commit/PasinduUmayanga/react-vite-exceljs-sample)](https://github.com/PasinduUmayanga/react-vite-exceljs-sample/commits/main)
[![Build status](https://ci.appveyor.com/api/projects/status/17uy8a50u77cv2u7/branch/main?svg=true)](https://ci.appveyor.com/project/Mahadenamuththa/react-vite-exceljs-sample/branch/main)
[![Build History](https://img.shields.io/badge/AppVeyor-Build%20History-blue?logo=appveyor)](https://ci.appveyor.com/project/Mahadenamuththa/react-vite-exceljs-sample/history)
[![Security scan](https://github.com/PasinduUmayanga/react-vite-exceljs-sample/actions/workflows/security.yml/badge.svg?branch=main)](https://github.com/PasinduUmayanga/react-vite-exceljs-sample/actions/workflows/security.yml)
![npm](https://img.shields.io/badge/npm-package%20manager-CB3837?logo=npm&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![ExcelJS](https://img.shields.io/badge/ExcelJS-4.4-217346?logo=microsoft-excel&logoColor=white)
![TanStack Router](https://img.shields.io/badge/TanStack%20Router-1-FF4154?logo=tanstack&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2-0F766E)

A Vite + React tutorial application for learning how to generate Excel reports in the browser with [ExcelJS](https://github.com/exceljs/exceljs). Follow the menu steps, download a workbook after each exercise, then use the Reporting project to export real mock-data reports.

## What this project teaches

- installing and configuring ExcelJS in a React project
- creating workbooks, worksheets, columns, rows, and formulas
- styling cells, dates, currencies, frozen headers, and table filters
- creating advanced Excel tables from API data
- downloading one workbook per user and a complete multi-sheet report
- displaying report data as React charts with Recharts

## Prerequisites

Install a current Node.js LTS release (Node.js 20 or later is recommended), which includes npm.

Verify the tools are available:

```bash
node --version
npm --version
```

## Install and run

Clone the repository, enter its directory, and install dependencies:

```bash
git clone https://github.com/PasinduUmayanga/react-vite-exceljs-sample.git
cd react-vite-exceljs-sample
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal (normally `http://localhost:5173`). The application starts on the **Welcome** lesson. Use the left-side menu to move through the tutorial steps, or select **Reporting project** to try the finished example.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server with hot reload. |
| `npm run build` | Type-check the project and create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally after running `npm run build`. |
| `npm run lint` | Check TypeScript and React source files with ESLint. |

Before sharing or deploying changes, run:

```bash
npm run lint
npm run build
```

## Installed npm packages

This is a React and Node.js project, so it uses **npm packages**, not NuGet packages. Run the following command once after cloning to install every dependency listed in `package.json`:

```bash
npm install
```

`package-lock.json` records the exact resolved package versions so installs remain consistent across machines.

### Application packages

| Package | Version | Used for |
| --- | --- | --- |
| `react` | 18.3.1 | Building the application interface. |
| `react-dom` | 18.3.1 | Rendering React into the browser DOM. |
| `@tanstack/react-router` | 1.170.32 | Type-safe file-based navigation for tutorial lessons and the reporting page. |
| `exceljs` | 4.4.0 | Creating, styling, and downloading `.xlsx` workbooks. |
| `recharts` | 2.15.0 | Rendering interactive reporting charts in the browser. |

### Development packages

| Package | Version | Used for |
| --- | --- | --- |
| `vite` | 6.0.5 | Local development server and production builds. |
| `typescript` | 5.6.3 | Static type checking. |
| `@vitejs/plugin-react` | 4.3.4 | React support in Vite. |
| `@tanstack/router-plugin` | 1.168.35 | Generates the typed TanStack Router route tree during development and builds. |
| `eslint` | 9.17.0 | Core JavaScript and TypeScript linting. |
| `@eslint/js` | 9.17.0 | ESLint's recommended JavaScript rule set. |
| `typescript-eslint` | 8.18.0 | TypeScript support for ESLint. |
| `eslint-plugin-react-hooks` | 5.0.0 | React Hooks lint rules. |
| `eslint-plugin-react-refresh` | 0.4.16 | Fast Refresh lint rules. |
| `@types/react` | 18.3.18 | TypeScript definitions for React. |
| `@types/react-dom` | 18.3.5 | TypeScript definitions for React DOM. |

## Project configuration

This project is ready to run after `npm install`; it does not require API keys, environment variables, a backend, or a database.

### Main application configuration

| Location | What it controls |
| --- | --- |
| `package.json` | Dependencies and npm commands. |
| `vite.config.ts` | Vite and React build configuration. |
| `src/routes/` | File-based browser routes for lessons and the reporting project. |
| `src/router.tsx` | Typed TanStack Router instance and router configuration. |
| `src/features/lessons/lessonContent.ts` | Tutorial step titles, explanations, and code samples. |
| `src/features/reporting/api.ts` | The mock users API endpoint. |
| `src/features/reporting/excel.ts` | ExcelJS workbook layouts and download filenames. |
| `src/styles/global.css` | Global styling and responsive sidebar behavior. |

### Change the mock data source

The Reporting project reads public demo users from JSONPlaceholder:

```ts
const API = 'https://jsonplaceholder.typicode.com/users'
```

To connect your own API, update `API` in `src/features/reporting/api.ts` and keep the returned fields compatible with `src/features/reporting/types.ts`. The current report expects each user to have an ID, name, username, email, phone, website, city, and company name.

### Change Excel report columns or styles

Edit `src/features/reporting/excel.ts` to change:

- workbook and worksheet names
- exported columns and their widths
- header colors and typography
- formulas, tables, filters, and frozen panes
- downloaded filenames

The Reporting project has two export paths:

- **Download `.xlsx`** on a user row creates one profile workbook.
- **Download all users `.xlsx`** creates a summary worksheet and a formatted users table.

## ExcelJS in the browser

Browser applications cannot use ExcelJS `writeFile()`, which is intended for Node.js. This project creates a browser-safe buffer, converts it to a `Blob`, and triggers a download:

```ts
const workbook = new ExcelJS.Workbook()
const sheet = workbook.addWorksheet('Report')

// Add report content here.
const buffer = await workbook.xlsx.writeBuffer()
const blob = new Blob([buffer], {
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
})
```

Native Excel chart generation is not part of the documented ExcelJS API. The application therefore uses Recharts for live browser charts and exports the source data to Excel tables for further analysis.

## Dependency security

Dependabot checks npm packages and GitHub Actions dependencies every week and opens update pull requests when newer versions are available. The GitHub **Security scan** workflow runs on pull requests, pushes to `main`, and every Monday. It installs the locked dependency tree, runs `npm audit`, and reviews dependency changes introduced by pull requests.

Run the same dependency audit locally with:

```bash
npm audit --audit-level=high
```

After this repository is connected to GitHub Actions, enable the dependency graph, Dependabot alerts, and Dependabot security updates in the repository's Security settings.

## Application structure

```text
src/
├─ app/                 Routes and top-level application setup
├─ components/
│  ├─ atoms/            Small reusable controls
│  ├─ molecules/        Combined controls, such as export actions
│  ├─ organisms/        Sidebar navigation and larger UI sections
│  └─ templates/        Shared page layout
├─ features/
│  ├─ lessons/          Tutorial content
│  └─ reporting/        API, types, ExcelJS exports, and report logic
├─ pages/               Lesson and reporting pages
├─ routes/               File-based TanStack Router route modules
├─ router.tsx            Router instance and type registration
└─ styles/              Global responsive styles
```

## Troubleshooting

- **`npm install` fails:** Check that Node.js and npm are installed, then delete `node_modules` and run `npm install` again.
- **The mock users do not load:** Check your internet connection, then use the **Retry** button. JSONPlaceholder is a public demonstration API.
- **No Excel download appears:** Allow downloads for the local site in your browser and try the action again.
- **The production build fails:** Run `npm run lint` first, fix the reported issue, then retry `npm run build`.
