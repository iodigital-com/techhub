import jobs from '@data/jobs.ts';
import stringSimilarity from 'string-similarity';

export function getAllJobs() {
  return jobs;
}

export function getLatestJobs(num = 5) {
  const { jobs } = getAllJobs();
  return {
    jobs: jobs
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      .slice(0, num),
  };
}

export function getRelatedJobs(num = 5, searchString: string) {
  const { jobs } = getAllJobs();

  const jobResults = jobs.map((job) => {
    const tagString = job.tags.tag instanceof Array ? job.tags.tag.join(' ') : job.tags.tag || '';
    const titleAndTags = `${job.title} || ${tagString}`;

    const result = stringSimilarity.compareTwoStrings(searchString, titleAndTags);

    return {
      job,
      score: result,
    };
  });

  const bestMatches = jobResults
    .sort((a, b) => b.score - a.score)
    .map((a) => a.job)
    .slice(0, num);

  return {
    jobs: bestMatches,
  };
}
