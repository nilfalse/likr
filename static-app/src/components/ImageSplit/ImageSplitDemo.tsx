import React, { FC, TransitionEventHandler, useCallback, useState, useEffect } from 'react';
import { FluidObject } from 'gatsby-image';

import { Container } from '../Container';

import { ImageSplit } from './ImageSplit';

import './ImageSplit.css';

export * from './useDefaultImages';
export * from './ImageSplit';

interface ImageSplitDemoProps {
  images: ReadonlyArray<readonly [FluidObject, FluidObject]>;
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const ImageSplitDemo: FC<ImageSplitDemoProps> = ({ images }) => {
  const [currentStep, setCurrentStep] = useState('show');
  const [currentIdx, setIndex] = useState(0);
  const [currentSelected, setSelected] = useState<number | null>(null);
  const [nextIdx, setNextIndex] = useState(1);

  const handleSlideTransitionEnd: TransitionEventHandler<HTMLDivElement> = useCallback(
    evt => {
      if (evt.propertyName === 'width' && currentStep === 'select') {
        setCurrentStep('select_done');
      }

      if (evt.propertyName === 'transform' && evt.target === evt.currentTarget) {
        setCurrentStep('go_done');
      }
    },
    [currentStep, nextIdx, images.length],
  );

  useEffect(() => {
    switch (currentStep) {
      case 'show': {
        const timeout = setTimeout(() => {
          setCurrentStep('select');
          setSelected(getRandomInt(0, 1));
        }, 2000);
        return () => clearTimeout(timeout);
      }
      case 'select_done': {
        const timeout = setTimeout(() => {
          setCurrentStep('go');
        }, 2000);
        return () => clearTimeout(timeout);
      }
      case 'go_done': {
        setCurrentStep('show');
        setSelected(null);
        setIndex(nextIdx);
        let newNextIdx = nextIdx + 1;
        setNextIndex(newNextIdx >= images.length ? 0 : newNextIdx);
        break;
      }
    }
  }, [currentStep, nextIdx, images.length]);

  const classNames = ['image-split-demo'];
  if (currentStep === 'go' || currentStep === 'go_done') {
    classNames.push('image-split-demo_enter');
  }

  return (
    <Container className={classNames.join(' ')}>
      {images
        .map((set, idx) => {
          const isCurrent = idx === currentIdx;
          const isNext = idx === nextIdx;
          const selected = currentIdx === idx ? currentSelected : null;

          let classNames = ['image-split-demo__item'];
          if (isCurrent) {
            classNames.push('image-split-demo__current');
          } else if (isNext) {
            classNames.push('image-split-demo__next');
          } else {
            classNames.push('image-split-demo__hidden');
          }

          let handleTransitionEnd: undefined | TransitionEventHandler<HTMLDivElement>;
          if (isCurrent || isNext) {
            handleTransitionEnd = handleSlideTransitionEnd;
          }

          let weight = 0;
          if (isCurrent) {
            weight = 1;
          }
          if (isNext) {
            weight = 2;
          }
          return {
            className: classNames.join(' '),
            handleTransitionEnd,
            idx,
            selected,
            set,
            weight,
          };
        })
        .sort((a, b) => a.weight - b.weight)
        .map(({ className, handleTransitionEnd, idx, selected, set }) => (
          <div key={idx} className={className} onTransitionEnd={handleTransitionEnd}>
            <ImageSplit items={set} selected={selected} className="image-split-demo__container" />
          </div>
        ))}
    </Container>
  );
};
