# App Template - Webview

Next.js application template with TypeScript, Tailwind CSS, and quality tools pre-configured for rapid development.

---

## Table of Contents

- [Technology Stack](#technology-stack)
- [Available Scripts](#available-scripts)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [What's Included](#whats-included)
- [Contributing](#contributing)

---

## Technology Stack

### Core Framework ✅

- **Next.js 15** - app router configured → [Documentation](https://nextjs.org/docs)
- **TypeScript** - strict mode enabled → [Handbook](https://www.typescriptlang.org/docs/)
- **Tailwind CSS** - design system ready → [Documentation](https://tailwindcss.com/docs)

### HTTP & State 🚀

- **TanStack Query** - provider configured → [React Guide](https://tanstack.com/query/latest)
- **Zustand** - store structure ready → [Getting Started](https://zustand-demo.pmnd.rs/)

### Forms & Validation 🚀

- **React Hook Form** - dependencies installed → [Quick Start](https://react-hook-form.com/get-started)
- **Zod** - validation schemas ready → [Documentation](https://zod.dev/)

### Quality Tools ✅

- **Vitest** - test environment configured → [Guide](https://vitest.dev/guide/)
- **Testing Library** - component testing ready → [Documentation](https://testing-library.com/docs/)
- **ESLint + Prettier** - code quality automated → [ESLint](https://eslint.org/docs/latest/) | [Prettier](https://prettier.io/docs/en/)

**Legend:** ✅ Implemented & Configured | 🚀 Installed & Ready to Use

---

## Available Scripts

### Development

```bash
npm run dev          # start development server
npm run build        # production build
npm run start        # start production server
```

### Code Quality

```bash
npm run test         # run test suite
npm run test:watch   # tests in watch mode
npm run lint         # check code quality
npm run format       # check code formatting
```

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) via [nvm](https://github.com/nvm-sh/nvm) (version in .nvmrc)

### Setup

```bash
# install dependencies and setup
nvm install && nvm use
npm install

# start development
npm run dev
open http://localhost:3000
```

---

## Documentation

### Getting Started

- **[Setup Guide](docs/getting-started.md)** - installation and first steps

### Development

- **[Architecture](docs/architecture.md)** - project structure and patterns
- **[HTTP Service](docs/service-http.md)** - complete HTTP service layer with REST, GraphQL, and performance optimization
- **[Development](docs/development.md)** - development workflow, quality tools, and testing

### Reference

- **[Browser Support](docs/browser-support.md)** - compatibility requirements

---

## What's Included

### Working Features ✅

- **HTTP Service Layer** - rest and graphql clients with adapter pattern
- **Testing Infrastructure** - vitest with react testing library and coverage thresholds
- **Code Quality Automation** - eslint, prettier, and pre-commit hooks
- **Development Environment** - typescript strict mode, tailwind css, hot reload

### Ready to Implement 🚀

- **State Management** - zustand for client state, tanstack query for server state
- **Form Handling** - react hook form with zod validation
- **Custom Hooks** - structure prepared for business logic extraction

---

## Contributing

Read our [development guide](docs/development.md) for setup and testing requirements.
