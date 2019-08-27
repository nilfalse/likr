import React, { FC } from 'react';

export interface HeroProps {
  className?: string;
}

export const Hero: FC<HeroProps> = ({ className, children }) => {
  const classNames = ['hero'];
  if (className) {
    classNames.push(className);
  }

  return (
    <section className={classNames.join(' ')}>
      <div className="hero__container">{children}</div>
    </section>
  );
};
