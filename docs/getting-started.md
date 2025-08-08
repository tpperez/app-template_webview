# Getting Started

Complete setup guide for using the Next.js App Template.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [First Steps](#first-steps)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)
- [Related Documentation](#related-documentation)

---

## Prerequisites

### Required Tools

- **Node.js** - use [nvm](https://github.com/nvm-sh/nvm) for version management
- **npm** - included with node.js installation
- **Git** - for version control

### Recommended Tools

- **VS Code** - optimal ide integration with provided settings
- **VS Code Extensions** - prettier, eslint, typescript, tailwind css intellisense

---

## Installation

```bash
# install and use correct node.js version
nvm install && nvm use

# install dependencies
npm install

# start development server
npm run dev

# verify setup
npm test
npm run lint
```

### Access Application

- **Development Server:** http://localhost:3000
- **Hot Reload:** automatic on file changes
- **Type Checking:** real-time in supported editors

---

## Project Structure

```
app/                    # next.js application source
├── (routes)/           # route organization with groups
├── components/         # reusable ui components
├── views/              # page coordinators
├── services/           # http clients and business logic
├── utils/              # helper functions
├── constants/          # application constants
├── types/              # global type definitions
└── styles/             # styling configuration
```

### Key Features Ready

- **HTTP Services** - rest and graphql clients configured
- **Testing Setup** - vitest with react testing library
- **Code Quality** - eslint, prettier, pre-commit hooks
- **TypeScript** - strict mode with path mapping
- **Tailwind CSS** - utility classes and design tokens

---

## First Steps

### 1. Explore the Template

```bash
npm run dev          # start development server
npm run test:watch   # run tests to see patterns
npm run lint         # check code quality setup
```

### 2. Understand What's Implemented ✅

- **Home Page** - example view with components
- **HTTP Service Layer** - rest/graphql clients ready
- **Testing Patterns** - component and service tests
- **Quality Tools** - automated linting and formatting

### 3. What's Ready to Use 🚀

- **State Management** - zustand stores (structure prepared)
- **Custom Hooks** - directory ready for business logic
- **Form Handling** - react hook form + zod (dependencies installed)

---

## Development Workflow

### Daily Commands

```bash
npm run dev          # development server
npm run test:watch   # tests in watch mode
npm run lint:fix     # auto-fix code issues
npm run format:fix   # auto-format code
```

### Pre-commit Validation

Automated quality gates run before each commit:

- typescript compilation check
- test execution
- eslint auto-fix
- prettier formatting

---

## Troubleshooting

### Common Issues

**Node.js Version Mismatch**

```bash
nvm use
node --version  # should match .nvmrc
```

**Dependency Issues**

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Development Server Issues**

```bash
rm -rf .next
npm run dev
```

---

## Next Steps

- **[Architecture](architecture.md)** - understand project patterns
- **[HTTP Service](service-http.md)** - complete HTTP service layer with REST, GraphQL, and performance optimization
- **[Development](development.md)** - development workflow, quality tools, and testing

### External Resources

- **[Next.js Documentation](https://nextjs.org/docs)** - framework reference
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - type system guide
- **[Tailwind CSS Documentation](https://tailwindcss.com/docs)** - styling framework
- **[TanStack Query Guide](https://tanstack.com/query/latest)** - server state management

---

## Related Documentation

- **[← Back to README](../README.md)** - overview and technology stack
- **[Architecture](architecture.md)** - project structure and patterns
- **[HTTP Service](service-http.md)** - complete HTTP service layer with REST, GraphQL, and performance optimization
- **[Development](development.md)** - development workflow, quality tools, and testing
- **[Browser Support](browser-support.md)** - compatibility requirements
