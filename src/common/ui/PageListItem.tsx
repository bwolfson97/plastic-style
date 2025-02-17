import React, { useCallback } from 'react';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';

import useResponsive from '../hooks/useResponsive';

import TitleDisplay from './TitleDisplay';
import Divider from './Divider';

import styles from './PageListItem.module.scss';

type ComponentProps = {
  id?: string;
  title: string;
  secondaryTitle?: string;
  description?: string;
  src: string;
  link: string;
  linkLabel: string;
  preLink?: string;
};

export default function PageListItem({
  id,
  link,
  title,
  secondaryTitle,
  description,
  src,
  linkLabel,
  preLink,
}: ComponentProps): React.ReactElement {
  const history = useHistory();

  const { isMobile } = useResponsive();

  const onRedirect = useCallback((): void => {
    if (preLink) {
      history.replace(preLink);
    }

    history.push(link);
  }, [link, preLink]);

  return (
    <div id={id} className={classnames(styles.PageListItem, isMobile && styles.mobile)}>
      <div className={styles.link} onClick={onRedirect}>
        <TitleDisplay
          className={styles.titleDisplay}
          title={title}
          secondaryTitle={secondaryTitle}
          src={src}
          description={description}
        >
          <div className={styles.linkLabel}>{linkLabel}</div>
        </TitleDisplay>
      </div>
      <div className={styles.divider}>
        <Divider />
      </div>
    </div>
  );
}
