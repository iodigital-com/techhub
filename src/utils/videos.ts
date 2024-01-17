import videos from '@data/youtube.json';
import { getDateTime } from '@utils/getDateTime.ts';

export const getVideos = () =>
  (videos.videos as Videos).toSorted(
    (a, b) => getDateTime(b.publishedAt) - getDateTime(a.publishedAt)
  );

export const getLatestVideos = (num = 5) => getVideos().slice(0, num);

export interface Video {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
  };
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
  id: string;
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export type Videos = Video[];
