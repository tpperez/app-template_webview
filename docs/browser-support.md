# Browser Support

Browser compatibility requirements and testing strategy for the template.

---

## Table of Contents

- [Browser Support Policy](#browser-support-policy)
- [Supported Browsers](#supported-browsers)
- [WebView Support](#webview-support)
- [Unsupported Browsers](#unsupported-browsers)
- [Technical Requirements](#technical-requirements)
- [Configuration](#configuration)
- [Related Documentation](#related-documentation)

---

## Browser Support Policy

The template supports **last 2 stable versions** of major browsers, focusing on modern web standards and performance optimization.

---

## Supported Browsers

### Desktop Browsers

- **Chrome** (last 2 stable versions)
- **Firefox** (last 2 stable versions)
- **Safari** (last 2 stable versions)
- **Edge** (last 2 stable versions)

### Mobile Browsers

- **Chrome Android** (last 2 stable versions)
- **Firefox Android** (last 2 stable versions)
- **Samsung Internet** (last 2 stable versions)
- **Safari iOS** (last 2 stable versions)

---

## WebView Support

The application works correctly within native app webviews. WebView support uses more conservative version requirements than standalone browsers:

### Android WebView

- **Android System WebView** (Android 8.0+)
- **Apps using WebView component** - compatible with Chrome engine
- **Hybrid apps** - Cordova, Ionic, React Native WebView

### iOS WKWebView

- **WKWebView component** (iOS 15.5+)
- **Apps using WKWebView** - compatible with Safari engine
- **Hybrid apps** - Cordova, Ionic, React Native WebView

### WebView Testing

**Android WebView Debug:**

1. Enable "Developer options" on device
2. Enable "USB debugging for webviews"
3. Use Chrome DevTools for debugging

**iOS WKWebView Debug:**

1. Enable "Web Inspector" in Safari settings
2. Connect device to Mac
3. Use Safari DevTools for debugging

### WebView Version Strategy

WebView support is more conservative than standalone browsers because:

- Apps may not update webview components immediately
- Corporate devices often run older OS versions
- WebViews don't auto-update like standalone browsers

**Android 8.0+** ensures compatibility with apps built 3-4 years ago
**iOS 15.5+** covers most current enterprise and consumer deployments

Learn more: [Android WebView](https://developer.android.com/guide/webapps/webview) | [iOS WKWebView](https://developer.apple.com/documentation/webkit/wkwebview)

---

## Unsupported Browsers

- **Internet Explorer** (all versions)
- **Edge Legacy** (non-Chromium versions)
- **Browsers 3+ major versions behind** current stable releases

---

## Technical Requirements

### Modern Web Standards

- **ES2018+** support (with polyfills for older webviews)
- **CSS Grid & Flexbox** (with fallbacks for older webviews)
- **CSS Custom Properties**
- **ES Modules** (with transpilation fallback)

### JavaScript APIs

- **Fetch API**
- **Promise** native support
- **Async/await**
- **IntersectionObserver** (with polyfill for older webviews)

### WebView Compatibility

The application uses progressive enhancement and automatic polyfills to ensure compatibility with older webview versions (Android 8.0+ and iOS 15.5+).

---

## Configuration

### Browserslist Setup

The following configuration ensures proper browser support in the generated build:

```json
{
  "browserslist": [
    "last 2 Chrome versions",
    "last 2 Firefox versions",
    "last 2 Safari versions",
    "last 2 Edge versions",
    "last 2 ChromeAndroid versions",
    "last 2 FirefoxAndroid versions",
    "last 2 Samsung versions",
    "iOS >= 15.5",
    "Android >= 8.0"
  ]
}
```

This configuration enables automatic CSS prefixing and JavaScript transpilation for the specified browser versions.

---

## Related Documentation

- **[← Back to README](../README.md)** - technology stack and development overview
- **[Getting Started](getting-started.md)** - setup requirements and installation
- **[Architecture](architecture.md)** - project structure and patterns
- **[HTTP Service](service-http.md)** - complete HTTP service layer with REST, GraphQL, and performance optimization
- **[Development](development.md)** - development workflow, quality tools, and testing
