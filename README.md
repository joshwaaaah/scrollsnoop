# ScrollSnoop

A lightweight TypeScript library that provides CSS custom properties for scroll position, enabling dynamic scroll shadows and other scroll-based visual effects.

## Features

- **Real-time scroll tracking**: Monitors scroll position and updates CSS custom properties
- **CSS custom properties**: Provides `--scroll-*-percentage` variables for easy styling
- **Automatic cleanup**: Properly disposes of event listeners and observers
- **TypeScript support**: Fully typed for better development experience
- **Lightweight**: Minimal footprint with no external dependencies

## Installation

```bash
npm install scrollsnoop
```

## Usage

### Basic Setup

```typescript
import { ScrollSnoop } from 'scrollsnoop';

// Initialize with wrapper and overflow container elements
const scrollSnoop = new ScrollSnoop(
  document.querySelector('.scrollsnoop')!, // Wrapper element
  document.querySelector('.scrollsnoop-overflow-container')! // Scrollable container
);
```

### HTML Structure

```html
<div class="scrollsnoop">
  <div class="scrollsnoop-overflow-container">
    <!-- Your scrollable content here -->
  </div>
</div>
```

### CSS Custom Properties

The library automatically sets these CSS custom properties on the wrapper element:

- `--scroll-top-percentage`: Scroll position from top (0.00 to 1.00)
- `--scroll-bottom-percentage`: Scroll position from bottom (1.00 to 0.00)
- `--scroll-left-percentage`: Scroll position from left (0.00 to 1.00)
- `--scroll-right-percentage`: Scroll position from right (1.00 to 0.00)

### Example: Scroll Shadows

```css
.scrollsnoop {
  position: relative;
}

.scrollsnoop::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), transparent);
  opacity: var(--scroll-top-percentage);
  pointer-events: none;
}

.scrollsnoop::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
  opacity: var(--scroll-bottom-percentage);
  pointer-events: none;
}
```

### Horizontal Scroll Shadows

```css
.scrollsnoop-horizontal {
  position: relative;
}

.scrollsnoop-horizontal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 100%;
  background: linear-gradient(to right, rgba(0,0,0,0.3), transparent);
  opacity: var(--scroll-left-percentage);
  pointer-events: none;
}

.scrollsnoop-horizontal::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 100%;
  background: linear-gradient(to left, rgba(0,0,0,0.3), transparent);
  opacity: var(--scroll-right-percentage);
  pointer-events: none;
}
```

### Cleanup

```typescript
// Clean up when done
scrollSnoop.destroy();
```

## API Reference

### Constructor

```typescript
new ScrollSnoop(wrapper: HTMLElement, overflowContainer: HTMLElement)
```

- `wrapper`: The element that will receive the CSS custom properties
- `overflowContainer`: The scrollable element to monitor

### Methods

#### `destroy()`

Removes event listeners and disconnects the ResizeObserver. Call this when you're done with the instance to prevent memory leaks.
