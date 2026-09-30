import React, { useEffect, useRef, useState } from 'react';

/**
 * Custom Sticker-Style Chunky Pointer Cursor
 * Matches the bold, rounded black arrow with thick white outline & soft drop shadow
 * Designed specifically for laptop/desktop screens (pointer: fine)
 */
export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);

  useEffect(() => {
    // Check if the current device is a laptop / desktop with a precise mouse pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    let rafId: number;
    let mouseX = -100;
    let mouseY = -100;
    let lastHovered = false;
    let lastInput = false;
    let lastVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!lastVisible) {
        lastVisible = true;
        setIsVisible(true);
      }

      // Check if hovering over an interactive element or text input
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, [role="button"], select, .cursor-pointer, [data-cursor="interactive"]')
        );
        if (isInteractive !== lastHovered) {
          lastHovered = isInteractive;
          setIsHovered(isInteractive);
        }

        const isInput = Boolean(
          target.closest('input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')
        );
        if (isInput !== lastInput) {
          lastInput = isInput;
          setIsTextInput(isInput);
        }
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleMouseLeave = () => {
      lastVisible = false;
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      lastVisible = true;
      setIsVisible(true);
    };

    // High performance 120fps/144fps smooth animation loop without React state re-render lag
    const updateCursorPosition = () => {
      if (cursorRef.current) {
        // Offset by (6px, 6px) to align the exact visual tip of the SVG arrow with the true OS mouse click coordinate
        cursorRef.current.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0)`;
      }

      rafId = requestAnimationFrame(updateCursorPosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    rafId = requestAnimationFrame(updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        display: isVisible && !isTextInput ? 'block' : 'none',
      }}
      className="fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform"
    >
      <div
        className={`transition-transform duration-150 ease-out origin-[6px_6px] ${
          isPressed
            ? 'scale-[0.88]'
            : isHovered
            ? 'scale-[1.18]'
            : 'scale-100'
        }`}
        style={{
          filter:
            'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.28)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.18))',
        }}
      >
        <svg
          width="36"
          height="40"
          viewBox="0 0 36 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="select-none"
        >
          {/* Outer Thick White Rounded Contour + Solid Pitch Black Arrow Body */}
          <path
            d="M 6 6 L 27 16.5 L 17.5 20 L 11.5 28.5 L 6 6 Z"
            fill="#8F6E5B"
            stroke="#F7F1E5"
            strokeWidth="4.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
