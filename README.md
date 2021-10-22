# taparoo

![](https://flat.badgen.net/bundlephobia/minzip/taparoo)

> React component for touch event handling

### Install

```
$ npm install taparoo
```

### Props

```typescript
interface TaparooProps {
  className?: string;
  onSwipe?: TaparooTouchEventHandler;
  onSwipeUp?: TaparooTouchEventHandler;
  onSwipeDown?: TaparooTouchEventHandler;
  onSwipeLeft?: TaparooTouchEventHandler;
  onSwipeRight?: TaparooTouchEventHandler;
  onTap?: TaparooTouchEventHandler;
  swipeThreshold?: number;
}

// Types

type TaparooTouchEventHandler = (event: TouchEvent, swipes?: Array<SwipeDirection>) => void;
```

<img src="https://user-images.githubusercontent.com/881783/138025812-b4e5dcb9-1b77-4d98-a16e-3ededf50489f.png" alt="Give it a little tappy." height="200" />
