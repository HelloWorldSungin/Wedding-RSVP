# Frontend Testing Best Practices Reference

A concise reference guide for React component testing and E2E testing with Playwright.

---

## Table of Contents

1. [Testing Pyramid](#1-testing-pyramid)
2. [React Component Testing](#2-react-component-testing)
3. [E2E Testing with Playwright](#3-e2e-testing-with-playwright)
4. [Test Organization](#4-test-organization)

---

## 1. Testing Pyramid

### Distribution

| Layer | Percentage | Speed | Scope |
|-------|------------|-------|-------|
| Unit/Component | 70% | ms | Single component/function |
| Integration | 20% | seconds | Multiple components |
| E2E | 10% | minutes | Full application |

### What Belongs Where

**Component Tests:**
- React component rendering
- User interactions
- State changes
- Prop validation

**E2E Tests:**
- Critical user journeys only
- Full application interaction
- Visual regression testing

---

## 2. React Component Testing

### Setup with Vitest

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
});

// src/test/setup.js
import '@testing-library/jest-dom';
```

### Component Tests

```javascript
// src/components/__tests__/Card.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../Card';

describe('Card', () => {
  const mockData = {
    id: 1,
    name: 'Test Card',
    active: false,
  };

  it('renders card name', () => {
    render(<Card data={mockData} />);

    expect(screen.getByText('Test Card')).toBeInTheDocument();
  });

  it('calls onClick when button clicked', async () => {
    const onClick = vi.fn();
    render(<Card data={mockData} onClick={onClick} />);

    await userEvent.click(screen.getByRole('button', { name: /click/i }));

    expect(onClick).toHaveBeenCalledWith(1);
  });

  it('shows active state', () => {
    const activeData = { ...mockData, active: true };
    render(<Card data={activeData} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Testing with Providers

```javascript
// src/test/utils.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

export function renderWithProviders(ui) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </QueryClientProvider>
  );
}
```

### Query Priority (Use in Order)

1. `getByRole` - Accessible name (best)
2. `getByLabelText` - Form labels
3. `getByText` - Text content
4. `getByTestId` - Last resort

```javascript
// Preferred
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText('Email');

// Avoid
screen.getByTestId('submit-button');  // Only when necessary
```

---

## 3. E2E Testing with Playwright

### Playwright MCP Server Setup

```bash
# Add Playwright MCP to Claude Code
claude mcp add playwright npx @playwright/mcp@latest
```

### Configuration

```javascript
// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### Page Object Model

```javascript
// tests/e2e/pages/HomePage.js
export class HomePage {
  constructor(page) {
    this.page = page;
    this.mainButton = page.getByRole('button', { name: /get started/i });
    this.contentSection = page.getByTestId('content-section');
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickMainButton() {
    await this.mainButton.click();
  }
}
```

### E2E Tests

```javascript
// tests/e2e/home.spec.js
import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Home Page', () => {
  test('user can navigate the home page', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    // Verify content appears
    await expect(page.getByText('Welcome')).toBeVisible();

    // Click main button
    await homePage.clickMainButton();

    // Verify navigation or state change
    await expect(page).toHaveURL('/next-page');
  });
});
```

### Visual Testing

```javascript
test('page matches snapshot', async ({ page }) => {
  await page.goto('/');

  // Wait for content to load
  await expect(page.getByTestId('content')).toBeVisible();

  // Compare screenshot
  await expect(page).toHaveScreenshot('home.png', {
    mask: [page.locator('.timestamp')],  // Mask dynamic content
  });
});
```

### Running E2E Tests

```bash
# Run all E2E tests
npx playwright test

# Run with UI mode (debugging)
npx playwright test --ui

# Run specific test file
npx playwright test home.spec.js

# Update snapshots
npx playwright test --update-snapshots
```

---

## 4. Test Organization

### Directory Structure

```
src/
├── components/
│   └── __tests__/
│       └── Card.test.jsx
├── pages/
│   └── __tests__/
│       └── Home.test.jsx
└── test/
    ├── setup.js
    └── utils.jsx

tests/
└── e2e/
    ├── playwright.config.js
    ├── pages/
    │   └── HomePage.js
    └── home.spec.js
```

---

## Quick Reference

### Test Commands

```bash
# Component Tests
npm test                            # All tests
npm test -- --watch                 # Watch mode
npm test -- --coverage              # With coverage

# E2E
npx playwright test                 # All E2E tests
npx playwright test --ui            # UI mode
npx playwright test --debug         # Debug mode
```

### Assertion Cheatsheet

```javascript
// React Testing Library
expect(element).toBeInTheDocument();
expect(element).toBeVisible();
expect(element).toHaveText('text');
expect(element).toBeDisabled();
expect(mockFn).toHaveBeenCalledWith(arg);
```

```javascript
// Playwright
await expect(locator).toBeVisible();
await expect(locator).toHaveText('text');
await expect(page).toHaveURL('/path');
await expect(page).toHaveScreenshot();
```

---

## Resources

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Playwright MCP](https://github.com/microsoft/playwright-mcp)
