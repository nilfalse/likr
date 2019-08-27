import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react';
import { Link } from 'gatsby';

interface CommonProps {
  theme?: 'primary' | 'outline' | 'cta';
  className?: string;
}

interface PropsForButton extends ButtonHTMLAttributes<HTMLButtonElement>, CommonProps {}

interface PropsWithTo extends AnchorHTMLAttributes<HTMLAnchorElement>, CommonProps {
  to: string;
  disabled?: boolean;
}

function isLink(props: any): props is PropsWithTo {
  return typeof props.to === 'string';
}

export const Button: FC<PropsWithTo | PropsForButton> = ({ className, theme, ...props }) => {
  const classNames = ['button'];
  if (theme) {
    classNames.push(`button_${theme}`);
  }
  if (props.disabled) {
    classNames.push('button_disabled');
  }
  if (className) {
    classNames.push(className);
  }

  if (isLink(props)) {
    return (
      <Link {...props} className={classNames.join(' ')}>
        {props.children}
      </Link>
    );
  } else {
    const buttonProps = props as PropsForButton;
    return (
      <button
        type={props.onClick ? 'button' : 'submit'}
        {...buttonProps}
        className={classNames.join(' ')}
      >
        {props.children}
      </button>
    );
  }
};
