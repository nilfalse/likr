import React, { FC } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { IconLinkedIn, IconTelegram, IconTwitter, IconWhatsApp } from '../Icons';

export const SocialShare: FC = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          shareText
          hashtags
        }
      }
    }
  `);
  const siteUrl = encodeURIComponent(site.siteMetadata.siteUrl);
  const shareText = encodeURIComponent(site.siteMetadata.shareText);
  const hashtags = site.siteMetadata.hashtags.map(encodeURIComponent).join(',');
  const shareTextWithUrl = encodeURIComponent(
    `${site.siteMetadata.shareText} ${site.siteMetadata.siteUrl}`,
  );

  return (
    <ul className="footer__social-container">
      <li className="footer__social-item">
        <a
          href={`https://t.me/share/url?url=${siteUrl}&text=${shareText}`}
          target="_blank"
          rel="noreferrer nofollow noopener"
          title="Telegram"
        >
          <IconTelegram />
        </a>
      </li>
      <li className="footer__social-item">
        <a
          href={`http://twitter.com/share?url=${siteUrl}&text=${shareText}&hashtags=${hashtags}`}
          target="_blank"
          rel="noreferrer nofollow noopener"
          title="Twitter"
        >
          <IconTwitter />
        </a>
      </li>
      <li className="footer__social-item">
        <a
          href={'https://www.linkedin.com/shareArticle'}
          target="_blank"
          rel="noreferrer nofollow noopener"
          title="LinkedIn"
        >
          <IconLinkedIn />
        </a>
      </li>
      <li className="footer__social-item">
        <a
          href={'https://wa.me/?text=' + shareTextWithUrl}
          target="_blank"
          rel="noreferrer nofollow noopener"
          title="WhatsApp"
        >
          <IconWhatsApp />
        </a>
      </li>
    </ul>
  );
};
