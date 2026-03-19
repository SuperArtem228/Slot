import React from 'react';

type RescueSceneShellProps = {
  children: React.ReactNode;
};

/**
 * Root container for the iframe scene.
 * Sets up full-viewport dimensions, dark base, and font.
 */
export const RescueSceneShell: React.FC<RescueSceneShellProps> = ({ children }) => {
  return (
    <div
      data-component="scene-shell"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#060a10',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        color: '#ffffff',
      }}
    >
      {children}
    </div>
  );
};
