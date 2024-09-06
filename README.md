<div align="center">

![Dashlit Logo](https://github.com/pratik-codes/Dashlit/blob/master/apps/landing/public/logo-white.png)

### Dashlit - [Demo Extension](https://demo.dashlit.com/)

</div>

---

**Dashlit**: An open-source productivity extension for your browser. It offers an efficient method to manage your links, to-dos, customize your browser's home screen, manage meetings, emails, and ensures rapid accessibility. Developed with fervour by [**Pratik**](https://twitter.com/pratikk_tiwari).

---

## Architecture and Folder Structure

The organizational scheme of the repository is delineated as follows:

```plaintext
.
├── app/
│   ├── extension
│   └── landing
│   └── server
├── packages/
│   ├── ui
│   └── utils
├── package.json
├── pnpm.lock
├── turbo.json
└── tsconfig.json
```

### Explanation

**app/**: This directory constitutes the core application layers.

**extension**: This sub-folder houses the codebase for the browser extension itself, incorporating logic, views, and related assets.
**landing**: This is the landing page for the Dashlit application, responsible for the initial user interface.
**packages/**: This directory is planned for modular development.

**ui**: Currently empty, but intended for integrating Shadcn UI to create reusable UI components.

**utils**: This folder is also empty at present, designated for utility functions that will be shared across the application.

package.json, pnpm.lock: These files manage project dependencies.
turbo.json: Configuration file for TurboRepo.
tsconfig.json: Configuration settings for TypeScript compiler.

<br/>

## Contributions

##### Dashlit v2 is still in migration process we will let you know about contributions soon!!!!!!

<br/>

## Stack
```
Frontend: wxt (https://wxt.dev/) + react + TS + tailwind css + shadcn
Backend: Golang + chi + gorm
```
---
