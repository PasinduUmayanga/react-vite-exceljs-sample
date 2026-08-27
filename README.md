# ExcelJS Learning Lab

[![Last commit](https://img.shields.io/github/last-commit/PasinduUmayanga/react-vite-exceljs-sample)](https://github.com/PasinduUmayanga/react-vite-exceljs-sample/commits/main)
![npm](https://img.shields.io/badge/npm-package%20manager-CB3837?logo=npm&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![ExcelJS](https://img.shields.io/badge/ExcelJS-4.4-217346?logo=microsoft-excel&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-6-CA4245?logo=reactrouter&logoColor=white)
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
| `react` | 18.3 | Building the application interface. |
| `react-dom` | 18.3 | Rendering React into the browser DOM. |
| `react-router-dom` | 6.28 | Navigating tutorial lessons and the reporting page. |
| `exceljs` | 4.4 | Creating, styling, and downloading `.xlsx` workbooks. |
| `recharts` | 2.15 | Rendering interactive reporting charts in the browser. |

### Development packages

| Package | Used for |
| --- | --- |
| `vite` | Local development server and production builds. |
| `typescript` | Static type checking. |
| `@vitejs/plugin-react` | React support in Vite. |
| `eslint` and `@eslint/js` | JavaScript and TypeScript linting. |
| `typescript-eslint` | TypeScript support for ESLint. |
| `eslint-plugin-react-hooks` | React Hooks lint rules. |
| `eslint-plugin-react-refresh` | Fast Refresh lint rules. |
| `@types/react` and `@types/react-dom` | TypeScript definitions for React. |

## Project configuration

This project is ready to run after `npm install`; it does not require API keys, environment variables, a backend, or a database.

### Main application configuration

| Location | What it controls |
| --- | --- |
| `package.json` | Dependencies and npm commands. |
| `vite.config.ts` | Vite and React build configuration. |
| `src/app/App.tsx` | Browser routes for lessons and the reporting project. |
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
└─ styles/              Global responsive styles
```

## Troubleshooting

- **`npm install` fails:** Check that Node.js and npm are installed, then delete `node_modules` and run `npm install` again.
- **The mock users do not load:** Check your internet connection, then use the **Retry** button. JSONPlaceholder is a public demonstration API.
- **No Excel download appears:** Allow downloads for the local site in your browser and try the action again.
- **The production build fails:** Run `npm run lint` first, fix the reported issue, then retry `npm run build`.
