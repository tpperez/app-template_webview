# HTTP Services

API integration and server state management patterns implemented in the template.

---

## Table of Contents

- [HTTP Service Architecture](#http-service-architecture)
- [Client Usage Patterns](#client-usage-patterns)
- [Server-Side Integration](#server-side-integration)
- [Client-Side Integration](#client-side-integration)
- [Caching Strategy](#caching-strategy)
- [Error Handling](#error-handling)
- [Performance Features](#performance-features)
- [Configuration & Extension](#configuration--extension)
- [Testing Patterns](#testing-patterns)
- [Related Documentation](#related-documentation)

---

## HTTP Service Architecture ✅

The template includes a complete HTTP service layer with adapter pattern implementation for both REST and GraphQL APIs.

### Architecture Layers

**Application Layer** → TanStack Query Hooks ← Components
**Service Layer** → REST Client, GraphQL Client
**Adapter Layer** → Fetch REST Adapter, Fetch GraphQL Adapter
**Transport Layer** → Fetch API → HTTP/HTTPS

### Key Features Implemented

- **Unified client interfaces** - consistent api regardless of protocol
- **Adapter pattern** - flexible implementation swapping
- **Type safety** - full typescript integration
- **Error handling** - standardized error processing
- **Caching integration** - next.js and tanstack query coordination

---

## Client Usage Patterns ✅

### REST Client

**Available Methods:**

- `get<T>(path, options)` - get requests with type safety
- `post<T>(path, body, options)` - post requests with body
- `put<T>(path, body, options)` - put requests for updates
- `patch<T>(path, body, options)` - patch requests for partial updates
- `delete<T>(path, options)` - delete requests

**Import and Usage:**

```bash
# import location
import { restClient } from '@/app/services/http/rest'

# see implementation examples in:
app/services/http/rest/rest.test.ts
```

### GraphQL Client

**Available Methods:**

- `query<T>(query, variables, options)` - data fetching
- `mutation<T>(mutation, variables, options)` - data modifications
- `subscription<T>(subscription, variables, options)` - real-time data

**Import and Usage:**

```bash
# import location
import { graphqlClient } from '@/app/services/http/graphql'

# see implementation examples in:
app/services/http/graphql/graphql.test.ts
```

---

## Server-Side Integration ✅

Server components can fetch data directly for SEO optimization and performance.

### Implementation Pattern

- routes call http services directly for initial data
- data passed to views as props for immediate rendering
- next.js caching integration through fetch options
- error handling at the service level

**Benefits:**

- **SEO optimization** - server-side rendering
- **Performance** - reduced client requests
- **Cache integration** - next.js isr coordination

Learn more: [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

---

## Client-Side Integration 🚀

TanStack Query provider is configured for client-side server state management.

### Provider Configuration ✅

**Location:** `app/services/http/providers/react-query.tsx`

**Global Settings:**

- **Stale Time:** 5 minutes default
- **Retry:** 1 attempt for queries, disabled for mutations
- **Refetch:** disabled on window focus, enabled on reconnect

### Usage Patterns 🚀

**Query Hook Implementation:**

```bash
# hook structure ready for implementation:
app/hooks/

# provider configured in:
app/layout.tsx
```

**Infinite Query Pattern:**

```bash
# implementation examples in tests:
app/services/http/graphql/graphql.test.ts
```

Learn more: [TanStack Query](https://tanstack.com/query/latest) | [React Query Patterns](https://tanstack.com/query/latest/docs/framework/react/guides/queries)

---

## Caching Strategy ✅

Multi-layered caching implementation coordinates between browser, memory, and server caches.

### Cache Layer Coordination

| Layer              | Purpose                   | Implementation Status |
| ------------------ | ------------------------- | --------------------- |
| **Browser Cache**  | static assets, http cache | ✅ next.js configured |
| **TanStack Query** | in-memory server state    | ✅ provider ready     |
| **Next.js Cache**  | server-side data & isr    | ✅ fetch integration  |
| **Network Cache**  | cdn, proxy cache          | 🚀 headers ready      |

### Cache Configuration Examples

**Server-Side Caching:**

```bash
# next.js cache integration implemented in:
app/services/http/rest/adapters/fetch-rest.ts
app/services/http/graphql/adapters/fetch-graphql.ts
```

**Client-Side Configuration:**

```bash
# tanstack query settings:
app/services/http/providers/react-query.tsx
```

Learn more: [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching) | [TanStack Query Caching](https://tanstack.com/query/latest/docs/framework/react/guides/caching)

---

## Error Handling ✅

Standardized error processing across all HTTP operations.

### Error Processing Layers

**Adapter Level:** http status and response processing
**Client Level:** request formatting and retry logic
**Application Level:** user-friendly error display

**Implementation:**

```bash
# error handling utilities:
app/services/http/core/core.utils.ts

# error type definitions:
app/services/http/core/core.type.ts
```

### Error Response Structure

```typescript
interface IHttpError {
  message: string // user-friendly error message
  status: number // http status code
  code?: string // application error code
  details?: object // additional error context
}
```

---

## Performance Features ✅

### Request Optimization

- **Deduplication** - tanstack query prevents duplicate requests
- **Background Updates** - stale-while-revalidate patterns
- **Timeout Handling** - configurable request timeouts
- **Signal Support** - abortcontroller integration

### Testing Integration

**Mock Strategy:**

```bash
# service mocking examples:
app/services/http/rest/rest.test.ts
app/services/http/graphql/graphql.test.ts

# provider testing patterns:
app/services/http/providers/react-query.test.tsx
```

Learn more: [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) | [Request Optimization](https://web.dev/fetch-api-best-practices/)

---

## Configuration & Extension

### Environment Configuration

**Base URL Configuration:**

```bash
# environment variables:
NEXT_PUBLIC_API_URL=your-api-endpoint

# configuration location:
app/services/http/core/core.ts
```

### Adapter Customization

**Factory Pattern Implementation:**

```bash
# adapter configuration:
app/services/http/core/core.ts

# custom adapter examples:
app/services/http/rest/adapters/
app/services/http/graphql/adapters/
```

### Extension Patterns

- **Custom Adapters** - implement iresthtttpadapter or igraphqlhttpadapter
- **Middleware Integration** - add authentication, logging, or monitoring
- **Cache Strategies** - customize tanstack query configuration

---

## 🧪 Testing Patterns ✅

### Service Testing Strategy

**Mock at Client Level:**

```bash
# testing utilities and examples:
app/services/http/rest/rest.test.ts
app/services/http/graphql/graphql.test.ts
app/services/http/core/core.utils.test.ts
```

**Provider Testing:**

```bash
# react query provider testing:
app/services/http/providers/react-query.test.tsx
```

### Testing Benefits

- **Isolated testing** - mock at service boundaries
- **Type safety** - full typescript in tests
- **Real scenarios** - test actual request/response patterns

Learn more: [Vitest](https://vitest.dev/guide/) | [Testing Library](https://testing-library.com/docs/)

---

_Next: Explore [Development](development.md) for testing patterns and contribution guidelines, or review [Browser Support](browser-support.md) for API compatibility requirements._
