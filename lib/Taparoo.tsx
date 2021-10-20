import React, { FC, TouchEvent, useState } from 'react';

interface TaparooProps {
  className: string;
  onSwipe: Function;
  onSwipeUp: Function;
  onSwipeDown: Function;
  onSwipeLeft: Function;
  onSwipeRight: Function;
  onTap: Function;
  swipeThreshold: number;
}

export enum SwipeDirection {
  Up,
  Down,
  Left,
  Right,
}

export const Taparoo: FC<TaparooProps> = ({
  children,
  className,
  onTap,
  onSwipe,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  swipeThreshold,
}) => {
  const [touchMoved, setTouchMoved] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);

  function handleTouchStart(event: TouchEvent) {
    const { clientX, clientY } = event.touches[0];

    setStartX(clientX);
    setStartY(clientY);
  }

  function handleTouchMove() {
    if (!touchMoved) {
      setTouchMoved(true);
    }
  }

  function handleTouchEnd(event: TouchEvent) {
    if (!touchMoved) {
      onTap(event);
    }

    detectSwipes(event);

    setTouchMoved(false);
    setStartX(0);
    setStartY(0);
  }

  function detectSwipes(event: TouchEvent) {
    const { clientX, clientY } = event.changedTouches[0];
    const deltaX = startX - clientX;
    const deltaY = startY - clientY;
    const swipes = [];

    // Horizontal swipe

    if (deltaX > swipeThreshold) {
      swipes.push(SwipeDirection.Left);

      onSwipeLeft(event);
    } else if (deltaX < -swipeThreshold) {
      swipes.push(SwipeDirection.Right);

      onSwipeRight(event);
    }

    // Vertical swipe

    if (deltaY > swipeThreshold) {
      swipes.push(SwipeDirection.Up);

      onSwipeUp(event);
    } else if (deltaY < -swipeThreshold) {
      swipes.push(SwipeDirection.Down);

      onSwipeDown(event);
    }

    // General, horizontal or vertical, swipe

    if (swipes.length > 0) {
      onSwipe(swipes, event);
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
