# HTTP Service

Complete HTTP service layer with REST, GraphQL, and performance optimization for API integration and server state management.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Core Features](#core-features)
- [Integration Patterns](#integration-patterns)
- [Caching Strategy](#caching-strategy)
- [Architecture Overview](#architecture-overview)
- [Testing Approach](#testing-approach)
- [Configuration](#configuration)
- [Related Documentation](#related-documentation)

---

## Quick Start

### Import and Basic Usage

```typescript
import { restClient } from '@/app/services/http/rest'
import { graphqlClient } from '@/app/services/http/graphql'

// rest api calls
const users = await restClient.get<User[]>('/users')
const newUser = await restClient.post<User>('/users', userData)

// graphql operations
const result = await graphqlClient.query<UsersResponse>`
  query GetUsers($limit: Int!) {
    users(limit: $limit) { id name email }
  }
`, { limit: 10 }
```

### React Integration

```typescript
import { useQuery, useMutation } from '@tanstack/react-query'

// custom hooks for server state
export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => restClient.get<User[]>('/users'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

// component usage
const UsersList = () => {
  const { data: users, isLoading } = useUsers()
  // component logic...
}
```

---

## Core Features ✅

### REST Client Capabilities

- **Full HTTP Methods** - GET, POST, PUT, PATCH, DELETE with TypeScript generics
- **Request Configuration** - Custom headers, timeouts, base URLs per request
- **Error Handling** - Standardized error responses with status codes and details
- **Type Safety** - Complete TypeScript integration for requests and responses

### GraphQL Client Features

- **Query Operations** - Fetch data with variables and operation names
- **Mutations** - Modify data with automatic type inference
- **Subscriptions** - Real-time data streams (WebSocket support ready)
- **Fragment Support** - Reusable query fragments for complex schemas

### Performance Optimizations

- **Request Deduplication** - Multiple identical requests automatically merged
- **Automatic Retries** - Smart retry logic for network failures
- **Timeout Management** - Configurable timeouts with AbortController integration
- **Memory Efficiency** - Optimized adapter pattern reduces bundle size

---

## Integration Patterns

### Server-Side Usage ✅

The HTTP service works seamlessly in Next.js server components and API routes:

```typescript
// server component
const UsersPage = async () => {
  const users = await restClient.get<User[]>('/users', {
    tags: ['users'],
    revalidate: 300 // 5 minutes cache
  })
  return <UsersList initialData={users} />
}

// api route
export async function GET() {
  const users = await restClient.get<User[]>('/users')
  return NextResponse.json(users)
}
```

### Client-Side Patterns 🚀

Integration with TanStack Query provides reactive server state management:

- **Custom Hooks** - Encapsulate API calls with caching and error handling
- **Optimistic Updates** - UI updates immediately while syncing in background
- **Cache Invalidation** - Automatic data refresh after mutations
- **Infinite Queries** - Seamless pagination with automatic loading

### Error Boundaries

Standardized error handling across server and client contexts with typed error responses and automatic retry strategies for network failures.

---

## Caching Strategy ✅

### Multi-Layer Coordination

The HTTP service implements intelligent caching across multiple layers:

| Layer              | Purpose                   | Implementation Status |
| ------------------ | ------------------------- | --------------------- |
| **Browser Cache**  | Static assets, HTTP cache | ✅ Next.js configured |
| **TanStack Query** | In-memory server state    | ✅ Provider ready     |
| **Next.js Cache**  | Server-side data & ISR    | ✅ Fetch integration  |
| **Network Cache**  | CDN, proxy cache          | 🚀 Headers ready      |

### Cache Configuration Patterns

```typescript
// long-term static data (24h+)
const countries = await restClient.get<Country[]>('/countries', {
  tags: ['countries'],
  revalidate: 86400,
})

// medium-term dynamic data (5-30min)
const posts = await restClient.get<Post[]>('/posts', {
  tags: ['posts'],
  revalidate: 300,
})

// real-time data (no cache)
const liveData = await restClient.get<LiveData>('/live', {
  revalidate: false,
})
```

### Cache Coordination Benefits

- **Automatic Deduplication** - Identical requests merged across components
- **Background Updates** - Stale data served while fresh data loads
- **Tag-Based Invalidation** - Coordinated cache clearing across all layers
- **Progressive Enhancement** - Graceful degradation when cache unavailable

---

## Architecture Overview

### Implementation Layers

The HTTP service uses a clean adapter pattern with clear separation of concerns:

- **Application Layer** - React components and custom hooks
- **Service Layer** - REST and GraphQL clients with unified interfaces
- **Adapter Layer** - Fetch-based adapters for HTTP communication
- **Transport Layer** - Native Fetch API with polyfills

### Design Principles

**Type Safety First** - Complete TypeScript integration prevents runtime API errors

**Performance by Default** - Request deduplication, caching, and optimization built-in

**Framework Agnostic** - Core logic works independently of React/Next.js

**Testing Ready** - Comprehensive mocking patterns for isolated unit tests

### Adapter Pattern Benefits

- **Pluggable Transports** - Easy to swap fetch for other HTTP clients
- **Unified Interface** - Same API for REST and GraphQL operations
- **Error Standardization** - Consistent error handling across all adapters
- **Feature Extension** - Add new capabilities without breaking existing code

---

## Testing Approach ✅

### Testing Strategy

The HTTP service provides comprehensive testing patterns for reliable API integration:

**Service Layer Testing** - Mock adapters for isolated business logic validation

**Integration Testing** - Test React hooks with QueryClient providers

**Error Scenario Testing** - Network failures, validation errors, timeouts

**Cache Behavior Testing** - Verify invalidation and update patterns

### Mock Implementation

```typescript
// service mocking for tests
export const mockRestClient = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
}

vi.mock('@/app/services/http/rest', () => ({
  restClient: mockRestClient,
}))

// test implementation
it('should fetch user data', async () => {
  const mockUser = { id: '1', name: 'John Doe' }
  mockRestClient.get.mockResolvedValue(mockUser)

  const result = await fetchUser('1')
  expect(result).toEqual(mockUser)
})
```

### Testing Benefits

- **Isolation** - Test business logic without external dependencies
- **Speed** - Fast test execution without network calls
- **Reliability** - Predictable test data and consistent results
- **Coverage** - High test coverage with focused unit tests

### Example Test Files

- `app/services/http/rest/rest.test.ts` - REST client testing patterns
- `app/services/http/graphql/graphql.test.ts` - GraphQL client testing
- `app/services/http/core/core.utils.test.ts` - Utility function tests

---

## Configuration

### Environment Setup

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Service Configuration

The HTTP service automatically configures optimal defaults while remaining fully customizable:

**Base Configuration** - Default timeouts, retry counts, and cache settings

**Per-Request Overrides** - Custom base URLs, headers, and timeout values

**Authentication Integration** - Flexible header and token management

**Development vs Production** - Environment-specific optimizations

### Advanced Configuration

```typescript
// custom headers per request
const response = await restClient.get<User[]>('/users', {
  headers: { Authorization: `Bearer ${token}` },
  timeout: 5000,
  baseUrl: 'https://custom-api.com',
})

// graphql with custom endpoint
const result = await graphqlClient.query<PostsResponse>(query, variables, {
  headers: { 'X-API-Key': apiKey },
  revalidate: 60,
})
```

### Features Ready for Extension

- **Request Interceptors** - Automatic authentication and token refresh
- **Response Transformers** - Data normalization and formatting
- **Custom Adapters** - Alternative transport mechanisms
- **Monitoring Integration** - Performance tracking and error reporting

---

## Related Documentation

- **[← Back to README](../README.md)** - technology stack and development overview
- **[Getting Started](getting-started.md)** - setup requirements and installation
- **[Architecture](architecture.md)** - project structure and patterns
- **[Development](development.md)** - development workflow, quality tools, and testing
- **[Browser Support](browser-support.md)** - compatibility requirements

---

_Ready to implement? Check the test files for implementation examples:_

- `app/services/http/rest/rest.test.ts`
- `app/services/http/graphql/graphql.test.ts`
- `app/services/http/providers/react-query.test.tsx`
