import videos from '@data/youtube.json';
import stringSimilarity from 'string-similarity';
import { getDateTime } from '@utils/getDateTime.ts';

export interface Videos {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
  id: string;
}

interface Thumbnails {
  default: Default;
  medium: Default;
  high: Default;
}

interface Default {
  url: string;
  width: number;
  height: number;
}

export function getAllVideos() {
  return videos as { videos: Videos[] };
}

export function getLatestVideos(num = 5) {
  const { videos } = getAllVideos();
  return {
    videos: videos
      .toSorted((a, b) => getDateTime(b.publishedAt) - getDateTime(a.publishedAt))
      .slice(0, num),
  };
}

export function getRelatedVideos(num = 5, searchString: string) {
  const { videos } = getAllVideos();

  const videoResults = videos.map((video) => {
    const titleAndDescription = `${video.title} || ${video.description}`;
    const result = stringSimilarity.compareTwoStrings(searchString, titleAndDescription);

    return {
      video,
      score: result,
    };
  });

  const bestMatches = videoResults
    .sort((a, b) => b.score - a.score)
    .map((a) => a.video)
    .slice(0, num);

  return {
    videos: bestMatches,
  };
}
