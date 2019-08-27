import React, { FC, useCallback, useEffect, useState } from 'react';

import { Button } from '../Button';
import { Container } from '../Container';

const iconInfo = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-1.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zm0-10a1 1 0 0 1 1 1V16a1 1 0 0 1-2 0v-4.5a1 1 0 0 1 1-1zm0-1.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"
    />
  </svg>
);

export const CookieConsent: FC = () => {
  const [approved, setApproved] = useState(true);

  const approve = useCallback(() => {
    setApproved(true);
    localStorage.setItem('cookie', 't');
  }, [setApproved]);

  const readCookieConsent = useCallback(() => {
    const isApproved = localStorage.getItem('cookie') === 't';
    setApproved(isApproved);
  }, [setApproved]);

  useEffect(() => {
    readCookieConsent();

    window.addEventListener('storage', readCookieConsent, false);
    return () => {
      window.removeEventListener('storage', readCookieConsent, false);
    };
  }, [readCookieConsent]);

  const classNames = ['cookie-consent'];
  if (approved) {
    classNames.push('cookie-consent_hidden');
  }

  return (
    <div className={classNames.join(' ')}>
      <Container className="cookie-consent__container">
        <div className="cookie-consent__split cookie-consent__split_wide">
          <span className="cookie-consent__icon">{iconInfo}</span>
          <span className="cookie-consent__copy">
            We use cookies to offer you our service. By continuing to use this site you consent to
            our use of cookies.
          </span>
        </div>
        {approved ? null : (
          <div>
            <Button theme="outline" onClick={approve}>
              Got&nbsp;it
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};
