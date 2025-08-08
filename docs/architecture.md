# Architecture

Project structure and design patterns for scalable development.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Coordinator Pattern](#coordinator-pattern)
- [Naming Conventions](#naming-conventions)
- [Module Organization](#module-organization)
- [Data Flow Strategy](#data-flow-strategy)
- [Import Strategy](#import-strategy)
- [Implementation Guidelines](#implementation-guidelines)
- [Quality Integration](#quality-integration)
- [Related Documentation](#related-documentation)

---

## Architecture Overview

The template uses a **coordinator pattern** where Views orchestrate data fetching, state management, component composition, and user interactions.

### Key Principle

Views act as central coordinators that integrate server-side data with client-side functionality while maintaining clear separation of concerns.

---

## Project Structure

```
app/                                    # next.js application source
├── (routes)/                           # route organization with groups
│   ├── (public)/                       # public access routes
│   │   └── (home)/                     # home page implementation ✅
│   ├── (auth)/                         # authentication routes 🚀
│   └── api/                            # api endpoints 🚀
├── components/                         # reusable ui components
│   ├── structure/                      # layout components ✅
│   └── ui/                             # design system elements ✅
├── views/                              # page coordinators
│   └── home/                           # home page view ✅
├── services/                           # business logic and api integration
│   └── http/                           # http service layer ✅
├── utils/                              # helper functions ✅
├── constants/                          # application constants ✅
├── types/                              # global type definitions ✅
├── hooks/                              # custom hooks 🚀
├── stores/                             # state management 🚀
└── styles/                             # styling configuration ✅
```

**Legend:** ✅ Implemented | 🚀 Ready for Implementation

---

## Coordinator Pattern

### Views as Central Orchestrators

Views integrate multiple concerns into cohesive page experiences:

**View Responsibilities:**

- page structure and user experience
- data fetching coordination
- state management integration
- component composition
- user interaction handling

**Implementation Benefits:**

- clear separation between server and client concerns
- predictable data flow patterns
- easier testing and maintenance
- scalable component organization

---

## Naming Conventions

| Context                   | Pattern            | Examples                              |
| ------------------------- | ------------------ | ------------------------------------- |
| **Files & Directories**   | `kebab-case`       | `user-profile/`, `button.tsx`         |
| **React Components**      | `PascalCase`       | `ViewDashboard`, `UserCard`           |
| **TypeScript Interfaces** | `IPascalCase`      | `IViewDashboardProps`, `IUserData`    |
| **Type Aliases**          | `TPascalCase`      | `TButtonVariant`, `THttpMethod`       |
| **Variables & Functions** | `camelCase`        | `userData`, `formatName()`            |
| **Custom Hooks**          | `useCamelCase`     | `useUserProfile`, `useDataHistory`    |
| **Constants**             | `UPPER_SNAKE_CASE` | `USER_PROFILE_CONFIG`, `API_BASE_URL` |

### Benefits

- **Cross-platform compatibility** - consistent file naming across operating systems
- **IDE integration** - clear context about code element types
- **Team consistency** - reduced cognitive load during development

---

## Module Organization

Every module follows consistent internal structure:

### Simple Module (utilities)

```
cn/
├── cn.ts               # core implementation
├── cn.test.ts          # testing coverage
└── index.ts            # export barrel
```

### Standard Module (components)

```
button/
├── button.tsx          # component implementation
├── button.type.ts      # typescript interfaces
├── button.test.tsx     # component testing
└── index.ts            # export barrel
```

### Complex Module (features)

```
user-profile/
├── user-profile.tsx          # main component
├── user-profile.type.ts      # interface definitions
├── user-profile.const.ts     # configuration constants
├── user-profile.test.tsx     # component testing
├── components/               # sub-components
└── index.ts                  # export barrel
```

### Module Growth Guidelines

- start minimal, add complexity organically
- maintain consistent naming patterns
- use barrel exports for clean interfaces
- add sub-directories when you have 3+ related files

---

## Data Flow Strategy

### Server-Side Pattern ✅

- routes handle initial data fetching
- http services provide unified api patterns
- data passed to views as props
- next.js caching integration

### Client-Side Pattern 🚀

- views use custom hooks for dynamic data
- tanstack query for reactive caching
- zustand for client state management
- progressive enhancement approach

### State Integration

- **Server State:** tanstack query with intelligent caching
- **Client State:** zustand with persistence
- **Clear Boundaries:** separation between server and client concerns

Learn more: [TanStack Query](https://tanstack.com/query/latest) | [Zustand](https://zustand-demo.pmnd.rs/)

---

## Import Strategy

### Path Mapping Configuration

TypeScript path mapping enables clean, maintainable imports:

```typescript
// tsconfig.json paths configuration enables:
import Button from '@/app/components/ui/button'
import { restClient } from '@/app/services/http/rest'
```

### Import Patterns

- **Global imports:** `@/app/components/`, `@/app/services/`
- **Feature-specific:** relative imports within modules
- **Barrel exports:** clean interfaces through `index.ts`

### Benefits

- **Clean import paths** - no complex relative imports
- **Refactoring safety** - path consistency supports code changes
- **IDE support** - enhanced autocompletion and navigation

Learn more: [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)

---

## Implementation Guidelines

### What's Working ✅

- **HTTP Service Layer** - rest and graphql clients with adapter pattern
- **Component Structure** - global and feature-specific organization
- **Testing Patterns** - co-located tests with business logic
- **Type Safety** - strict typescript throughout

### What's Ready 🚀

- **State Management** - zustand stores structure prepared
- **Custom Hooks** - directory ready for business logic
- **Authentication** - route structure prepared
- **API Routes** - directory structure ready

### Quality Standards

- **80% test coverage** - focus on business logic
- **Consistent naming** - across all architectural layers
- **Clean boundaries** - clear separation of concerns
- **Progressive enhancement** - client-side enhancements without blocking server rendering

---

## Quality Integration

### Development-Time Quality

- **TypeScript strict mode** - type safety throughout
- **ESLint integration** - real-time code quality feedback
- **Prettier formatting** - consistent code style
- **IDE configuration** - optimal development experience

### Build-Time Quality

- **Type checking** - full typescript compilation validation
- **Test execution** - automated test running with coverage
- **Code quality** - eslint validation and auto-fixing

Learn more: [ESLint](https://eslint.org/docs/latest/) | [Prettier](https://prettier.io/docs/en/) | [TypeScript](https://www.typescriptlang.org/docs/)

---

## Related Documentation

- **[← Back to README](../README.md)** - technology stack overview
- **[Getting Started](getting-started.md)** - setup and first steps
- **[HTTP Service](service-http.md)** - complete HTTP service layer with REST, GraphQL, and performance optimization
- **[Development](development.md)** - development workflow, quality tools, and testing
- **[Browser Support](browser-support.md)** - compatibility requirements

---

_Next: Learn about [HTTP Service](service-http.md) for complete HTTP service layer with REST, GraphQL, and performance optimization, or explore [Development](development.md) for development workflow, quality tools, and testing._
