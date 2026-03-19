import React from 'react';
import type { RescueSceneState, AttemptNumber, RewardConfig } from './rescueSceneTypes';
import { BackgroundStage } from '../blocks/BackgroundStage/BackgroundStage';
import { AmbientDecorLayer } from '../blocks/AmbientDecorLayer/AmbientDecorLayer';
import { AttemptsHud } from '../blocks/AttemptsHud/AttemptsHud';
import { SlotFrame } from '../blocks/SlotFrame/SlotFrame';
import { ReelWindow } from '../blocks/ReelWindow/ReelWindow';
import { PrimaryActionButton } from '../blocks/PrimaryActionButton/PrimaryActionButton';
import { StatusCopyLayer } from '../blocks/StatusCopyLayer/StatusCopyLayer';
import { ImpactFxLayer } from '../blocks/ImpactFxLayer/ImpactFxLayer';
import { RewardMorphLayer } from '../blocks/RewardMorphLayer/RewardMorphLayer';
import { FinalOfferCard } from '../blocks/FinalOfferCard/FinalOfferCard';
import { FinalCtaZone } from '../blocks/FinalCtaZone/FinalCtaZone';

export type RescueSceneLayersProps = {
  sceneState: RescueSceneState;
  currentAttempt: AttemptNumber;
  headline: string;
  subheadline: string;
  statusTitle: string;
  statusSubtitle: string;
  ctaLabel: string;
  ctaEnabled: boolean;
  reward: RewardConfig;
  onTap: () => void;
};

export const RescueSceneLayers: React.FC<RescueSceneLayersProps> = ({
  sceneState,
  currentAttempt,
  headline,
  subheadline,
  statusTitle,
  statusSubtitle,
  ctaLabel,
  ctaEnabled,
  reward,
  onTap,
}) => {
  const showPrimaryCta =
    sceneState !== 'reward_hold' && sceneState !== 'closing';

  return (
    <>
      <BackgroundStage sceneState={sceneState} />
      <AmbientDecorLayer sceneState={sceneState} />

      <AttemptsHud
        sceneState={sceneState}
        currentAttempt={currentAttempt}
        headline={headline}
        subheadline={subheadline}
      />

      <SlotFrame sceneState={sceneState}>
        <ReelWindow sceneState={sceneState} />
      </SlotFrame>

      <ImpactFxLayer sceneState={sceneState} />
      <RewardMorphLayer sceneState={sceneState} />

      <StatusCopyLayer
        sceneState={sceneState}
        title={statusTitle}
        subtitle={statusSubtitle}
      />

      <FinalOfferCard sceneState={sceneState} reward={reward} />

      {showPrimaryCta && (
        <PrimaryActionButton
          sceneState={sceneState}
          label={ctaLabel}
          enabled={ctaEnabled}
          onTap={onTap}
        />
      )}

      <FinalCtaZone
        sceneState={sceneState}
        label={reward.ctaLabel}
        onTap={onTap}
      />
    </>
  );
};
