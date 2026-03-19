import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RescueSceneShell } from './RescueSceneShell';
import { RescueSceneLayout } from './RescueSceneLayout';
import { RescueSceneLayers } from './RescueSceneLayers';
import { RescueSceneController } from './rescueSceneController';
import { rescueSceneConfig } from './rescueSceneConfig';
import type { RescueSceneState, AttemptNumber } from './rescueSceneTypes';
import type { ReelWindowHandle } from '../blocks/ReelWindow/ReelWindow';

function getHudContent(state: RescueSceneState) {
  const cfg = rescueSceneConfig;

  if (state === 'near_miss_1' || state === 'ready_attempt_2') {
    return {
      headline: cfg.attempts[0].copy?.title ?? '',
      subheadline: cfg.attempts[0].copy?.subtitle ?? '',
    };
  }
  if (state === 'near_miss_2' || state === 'ready_attempt_3') {
    return {
      headline: cfg.attempts[1].copy?.title ?? '',
      subheadline: cfg.attempts[1].copy?.subtitle ?? '',
    };
  }

  return {
    headline: 'У вас 3 попытки',
    subheadline: 'Испытайте шанс на реванш',
  };
}

function getStatusCopy(state: RescueSceneState) {
  const cfg = rescueSceneConfig;
  if (state === 'near_miss_1') {
    return {
      title: cfg.attempts[0].copy?.title ?? '',
      subtitle: cfg.attempts[0].copy?.subtitle ?? '',
    };
  }
  if (state === 'near_miss_2') {
    return {
      title: cfg.attempts[1].copy?.title ?? '',
      subtitle: cfg.attempts[1].copy?.subtitle ?? '',
    };
  }
  return { title: '', subtitle: '' };
}

export const RescueSlotScene: React.FC = () => {
  const [sceneState, setSceneState] = useState<RescueSceneState>('preload');
  const controllerRef = useRef<RescueSceneController | null>(null);
  const sceneRootRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<ReelWindowHandle>(null);

  useEffect(() => {
    const ctrl = new RescueSceneController((newState) => {
      setSceneState(newState);
    });
    controllerRef.current = ctrl;

    // Defer start to next frame so DOM is ready
    requestAnimationFrame(() => {
      ctrl.setSceneRoot(sceneRootRef.current);
      ctrl.setReelHandle(reelRef.current);
      ctrl.start();
    });

    return () => {
      ctrl.reset();
    };
  }, []);

  const handleTap = useCallback(() => {
    controllerRef.current?.handleTap();
  }, []);

  const ctrl = controllerRef.current;
  const attemptNum: AttemptNumber = ctrl?.getCurrentAttemptNumber() ?? 1;
  const ctaLabel = ctrl?.getCtaLabel() ?? '';
  const ctaEnabled = ctrl?.isCtaEnabled() ?? false;

  const { headline, subheadline } = getHudContent(sceneState);
  const { title: statusTitle, subtitle: statusSubtitle } = getStatusCopy(sceneState);

  return (
    <RescueSceneShell>
      <div ref={sceneRootRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
        <RescueSceneLayout>
          <RescueSceneLayers
            sceneState={sceneState}
            currentAttempt={attemptNum}
            headline={headline}
            subheadline={subheadline}
            statusTitle={statusTitle}
            statusSubtitle={statusSubtitle}
            ctaLabel={ctaLabel}
            ctaEnabled={ctaEnabled}
            reward={rescueSceneConfig.reward}
            onTap={handleTap}
            reelRef={reelRef}
          />
        </RescueSceneLayout>
      </div>
    </RescueSceneShell>
  );
};
