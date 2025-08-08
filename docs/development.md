# Development

Development workflow, quality tools, and testing framework for the template.

---

## Table of Contents

- [Development Process](#development-process)
- [Code Quality Framework](#code-quality-framework)
- [Quality Metrics](#quality-metrics)
- [Testing Framework](#testing-framework)
- [Testing Patterns](#testing-patterns)
- [Testing Utilities](#testing-utilities)
- [Related Documentation](#related-documentation)

---

## Development Process

### Daily Workflow Commands

```bash
npm run dev          # development server with hot reload
npm run test:watch   # tests in watch mode
npm run lint:fix     # fix code quality issues
npm run format:fix   # apply consistent formatting
```

### Quality Commands

```bash
npm run test         # run complete test suite
npm run test:coverage # generate coverage reports
npm run test:ui      # interactive visual interface
npm run lint         # check code quality
npm run format       # check code formatting
npm run tsc          # typescript compilation check
```

### Build Commands

```bash
npm run build        # production build
npm run start        # start production server
npm run analyze      # bundle size analysis
```

---

## Code Quality Framework ✅

Automated quality standards enforced at multiple development stages.

### Quality Tools Integration

| Tool           | Purpose                  | Integration              |
| -------------- | ------------------------ | ------------------------ |
| **TypeScript** | static type checking     | ide + pre-commit         |
| **ESLint**     | code pattern enforcement | ide + pre-commit         |
| **Prettier**   | code formatting          | ide + pre-commit         |
| **Vitest**     | test execution           | development + pre-commit |
| **Husky**      | git hook automation      | pre-commit workflow      |

### Automated Quality Gates

**Pre-Commit Workflow (.husky/pre-commit):**

```bash
npm run tsc         # typescript compilation check
npm run test        # full test suite execution
npx lint-staged     # targeted file processing
```

### IDE Integration Benefits

- **Real-time type checking** - typescript errors during development
- **Automatic formatting** - prettier on file save
- **ESLint auto-fix** - fixable issues resolved automatically
- **Import organization** - automatic import cleanup

**VS Code Configuration:** `.vscode/settings.json` - optimized for the template

Learn more: [ESLint](https://eslint.org/docs/latest/) | [Prettier](https://prettier.io/docs/en/) | [TypeScript](https://www.typescriptlang.org/docs/)

---

## Quality Metrics ✅

### Coverage Configuration

**Coverage Targets:**

- **Branches:** 80% minimum
- **Functions:** 80% minimum
- **Lines:** 80% minimum
- **Statements:** 80% minimum

**Coverage Focus:**

- business logic components prioritized
- configuration files excluded
- generated content excluded

**Reporting:**

- **Console output** - development feedback
- **LCOV reports** - ide integration
- **HTML reports** - visual coverage analysis

### Performance Standards

**Build Performance:**

- typescript compilation optimization
- test execution efficiency
- lint processing on changed files only

**Developer Experience:**

- fast feedback loops
- clear error messages
- ide integration reducing manual verification

---

## Testing Framework ✅

Comprehensive testing infrastructure with Vitest and React Testing Library.

### Framework Configuration

- **Test Runner:** [Vitest](https://vitest.dev/guide/) with jsdom environment
- **Component Testing:** [React Testing Library](https://testing-library.com/docs/) with semantic queries
- **Coverage:** 80% threshold across branches, functions, lines, statements
- **Type Safety:** full typescript integration

### Testing Commands

```bash
npm run test         # execute complete test suite
npm run test:watch   # development mode with auto-rerun
npm run test:coverage # generate coverage reports
npm run test:ui      # interactive visual interface
```

### Test Configuration

**Configuration File:** `vitest.config.ts`
**Setup File:** `vitest.setup.ts` - framework mocks and utilities
**Coverage:** v8 provider with html/lcov reports

---

## Testing Patterns ✅

### Component Testing Strategy

User-centric testing approach focusing on accessibility and behavior over implementation details.

**Testing Examples:**

```bash
# component testing patterns:
app/components/ui/logo/logo.test.tsx
app/components/structure/header/header.test.tsx
app/views/home/home.test.tsx

# service testing patterns:
app/services/http/rest/rest.test.ts
app/services/http/graphql/graphql.test.ts
```

**Testing Guidelines:**

- use semantic queries (`getByRole`, `getByLabelText`) for accessibility validation
- test user-facing functionality over internal implementation
- focus on behavior and user experience
- validate component integration with design system

### Service Testing Strategy

HTTP service testing with adapter-level mocking for isolated business logic validation.

**Mock Strategy:**

```bash
# service mocking examples in:
app/services/http/rest/rest.test.ts
app/services/http/graphql/graphql.test.ts

# utility function tests:
app/services/http/core/core.utils.test.ts
```

**Benefits:**

- **Isolation** - test business logic without external dependencies
- **Type Safety** - full typescript validation in tests
- **Real Scenarios** - test actual request/response patterns

Learn more: [Vitest](https://vitest.dev/guide/) | [Testing Library](https://testing-library.com/docs/)

---

## Testing Utilities ✅

### Mock Implementation Examples

**Service Mocking:**

```bash
# http service mocking patterns:
app/services/http/rest/rest.test.ts
app/services/http/graphql/graphql.test.ts
```

**Component Testing:**

```bash
# component testing utilities:
vitest.setup.ts

# component test examples:
app/components/ui/logo/logo.test.tsx
app/views/home/components/*/
```

### Test Environment Setup

**Provider Testing:**

```bash
# query provider testing patterns:
app/services/http/providers/react-query.test.tsx
```

**Mock Strategy Benefits:**

- **Predictable testing** - consistent test data
- **Isolation** - test units without external dependencies
- **Speed** - fast test execution without network calls

---

## Related Documentation

- **[← Back to README](../README.md)** - technology stack and development overview
- **[Getting Started](getting-started.md)** - setup requirements and installation
- **[Architecture](architecture.md)** - project structure and patterns
- **[HTTP Service](service-http.md)** - complete HTTP service layer with REST, GraphQL, and performance optimization
- **[Browser Support](browser-support.md)** - compatibility requirements

---

_Ready to start? Begin with [Getting Started](getting-started.md) for setup, then explore [Architecture](architecture.md) to understand project patterns._
