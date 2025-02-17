import React, { useMemo } from 'react';
import { Redirect, useParams } from 'react-router';
import classnames from 'classnames';

import useResponsive from '../../../common/hooks/useResponsive';
import { PodcastSeason, PodcastEpisode } from '../../models/types';
import { MOCK_PODCASTS } from '../../models/constants';
import { podcastsPath } from '../../routes';

import TitleDisplay from '../../../common/ui/TitleDisplay';
import TitledParagraph from '../../../common/ui/TitledParagraph';
import Divider from '../../../common/ui/Divider';

import PodcastEpisodeItem from './PodcastEpisodeItem';

import styles from './PodcastSeasonPage.module.scss';

type RouteParams = {
  podcastId: string;
};

export default function PodcastSeasonPage(): React.ReactElement {
  const { podcastId } = useParams<RouteParams>();
  const { isMobile } = useResponsive();

  const podcast = useMemo((): PodcastSeason | null => {
    return MOCK_PODCASTS.find((p) => p.id === podcastId) || null;
  }, [podcastId]);

  if (!podcast) {
    return <Redirect to={podcastsPath()} />;
  }

  const { title, description = '', author, src, year, episodes } = podcast;

  return (
    <div className={classnames(styles.PodcastSeasonPage, isMobile && styles.mobile)}>
      <TitleDisplay className={styles.titleDisplay} title={title} src={src} largeHeader thumbnailWidthPx={260}>
        <TitledParagraph leftTitle={author} rightTitle={year} content={description} />
      </TitleDisplay>
      <Divider />
      <div className={styles.podcast}>
        {episodes.map((episode: PodcastEpisode) => (
          <PodcastEpisodeItem key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  );
}
