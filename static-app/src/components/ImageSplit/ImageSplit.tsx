import React, { FC, HTMLAttributes } from 'react';
import Img, { FluidObject } from 'gatsby-image';

import { Container } from '../Container';

interface ImageSplitProps extends HTMLAttributes<HTMLDivElement> {
  items: ReadonlyArray<FluidObject>;
  selected?: number | null;
  className?: string;
}

export const ImageSplit: FC<ImageSplitProps> = ({ className, items, selected, ...props }) => {
  const classNames = ['image-split__container'];
  if (className) {
    classNames.push(className);
  }

  return (
    <Container {...props} className="image-split">
      <div className={classNames.join(' ')}>
        {items.map((fluid, idx) => {
          const classNames = ['image-split__item'];
          if (selected !== null && selected !== idx) {
            classNames.push('image-split__item_hidden');
          }

          return (
            <div key={fluid.src} className={classNames.join(' ')}>
              <Img fluid={fluid} className="image-split__img" />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

ImageSplit.defaultProps = {
  items: [],
  selected: null,
};
