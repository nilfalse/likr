import React from 'react';

import { useDefaultImages } from './useDefaultImages';
import { ImageSplitDemo } from './ImageSplitDemo';

import './ImageSplit.css';
import './ImageSplitDemo.css';

export * from './useDefaultImages';
export * from './ImageSplit';

export default () => {
  const images = useDefaultImages();
  return <ImageSplitDemo images={images} />;
};
