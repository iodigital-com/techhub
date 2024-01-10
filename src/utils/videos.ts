import videos from '@data/youtube';
import stringSimilarity from 'string-similarity';

export function getAllVideos() {
  return videos;
}

export function getLatestVideos(num = 5) {
  const { videos } = getAllVideos();
  return {
    videos: videos
      .toSorted((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
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
