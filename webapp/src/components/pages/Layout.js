import * as React from 'react';

import * as assets from '~/node/util/_assets';

const bundleName = 'bundle';

export const Layout = ({ html, reqid = null }) => {
  const innerHTML = { __html: html };
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>likr</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <link rel="shortcut icon" href="favicon.ico" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/icons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png" />
        <meta name="apple-mobile-web-app-title" content="likr" />
        <link rel="apple-touch-startup-image" href="/images/splash/launch-640x1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/images/splash/launch-750x1294.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/images/splash/launch-1242x2148.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/images/splash/launch-1125x2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/images/splash/launch-1536x2048.png" media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/images/splash/launch-1668x2224.png" media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/images/splash/launch-2048x2732.png" media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-touch-icon.png" />
        <link rel="mask-icon" href="/images/icons/safari-pinned-tab.svg" color="#6F6F6F" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#ffffff" />
        {reqid ? <meta name="reqid" content={reqid} /> : null}
        <link rel="stylesheet" href={assets.resolve(bundleName, 'css')} />
      </head>
      <body>
        <div id="react-root" dangerouslySetInnerHTML={innerHTML} />
        <script src={assets.resolve(bundleName)}></script>
      </body>
    </html>
  );
};
