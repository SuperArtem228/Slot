import React from 'react';
import { layoutTokens } from '../theme/layoutTokens';

type RescueSceneLayoutProps = {
  children: React.ReactNode;
};

export const RescueSceneLayout: React.FC<RescueSceneLayoutProps> = ({ children }) => {
  return (
    <div
      data-component="scene-layout"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: layoutTokens.scene.maxWidth,
        minWidth: layoutTokens.scene.minWidth,
        height: '100%',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      {/* Safe area wrapper */}
      <div
        style={{
          position: 'absolute',
          top: layoutTokens.safeArea.top,
          bottom: layoutTokens.safeArea.bottom,
          left: layoutTokens.safeArea.left,
          right: layoutTokens.safeArea.right,
        }}
      >
        {children}
      </div>
    </div>
  );
};
