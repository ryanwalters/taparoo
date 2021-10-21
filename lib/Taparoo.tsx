import React, { FC, TouchEvent, useEffect, useState } from 'react';

type TaparooTouchEventHandler = (event: TouchEvent, swipes?: Array<SwipeDirection>) => void;

export enum SwipeDirection {
  Up = 'swipeUp',
  Down = 'swipeDown',
  Left = 'swipeLeft',
  Right = 'swipeRight',
}

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

export const Taparoo: FC<TaparooProps> = ({
  swipeThreshold = 40,
  children,
  className,
  onTap,
  onSwipe,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
}) => {
  const [touchMoved, setTouchMoved] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [touchCount, setTouchCount] = useState<number>(0);
  const [isMultiTouchGesture, setIsMultiTouchGesture] = useState<boolean>(false);

  // Determine if the current gesture is multi-touch

  useEffect(() => {
    if (touchCount > 1) {
      setIsMultiTouchGesture(true);
    }

    if (touchCount === 0) {
      setIsMultiTouchGesture(false);
    }
  }, [touchCount]);

  // Touch handlers

  function handleTouchStart(event: TouchEvent) {
    const { clientX, clientY } = event.touches[0];

    setTouchCount(event.touches.length);

    setStartX(clientX);
    setStartY(clientY);
  }

  function handleTouchMove() {
    if (!touchMoved) {
      setTouchMoved(true);
    }
  }

  function handleTouchEnd(event: TouchEvent) {
    if (!isMultiTouchGesture) {
      detectSingleTouchGestures(event);
    }

    setTouchCount(event.touches.length);
    setTouchMoved(false);
    setStartX(0);
    setStartY(0);
  }

  // Detect single-touch gestures

  function detectSingleTouchGestures(event: TouchEvent) {
    // Tap

    if (!touchMoved) {
      onTap?.(event);
    }

    const { clientX, clientY } = event.changedTouches[0];
    const deltaX = startX - clientX;
    const deltaY = startY - clientY;
    const swipes: Array<SwipeDirection> = [];

    // Horizontal swipe

    if (deltaX > swipeThreshold) {
      swipes.push(SwipeDirection.Left);

      onSwipeLeft?.(event, swipes);
    } else if (deltaX < -swipeThreshold) {
      swipes.push(SwipeDirection.Right);

      onSwipeRight?.(event, swipes);
    }

    // Vertical swipe

    if (deltaY > swipeThreshold) {
      swipes.push(SwipeDirection.Up);

      onSwipeUp?.(event, swipes);
    } else if (deltaY < -swipeThreshold) {
      swipes.push(SwipeDirection.Down);

      onSwipeDown?.(event, swipes);
    }

    // General, horizontal or vertical, swipe

    if (swipes.length > 0) {
      onSwipe?.(event, swipes);
    }
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={className}
    >
      {children}
    </div>
  );
};
