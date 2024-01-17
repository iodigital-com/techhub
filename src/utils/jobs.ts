import jobs from '@data/jobs.json';
import stringSimilarity from 'string-similarity';

export interface Jobs {
  id: string;
  title: string;
  location: string;
  country: string;
  city: string;
  postal_code: string;
  country_code: string;
  department: string;
  employment_type: string;
  category: string;
  experience: string;
  education: string;
  tags: Tags;
  min_hours: any;
  max_hours: any;
  careers_url: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  closed: string;
}

interface Tags {
  tag: string | string[];
}

export function getAllJobs() {
  return jobs as { jobs: Jobs[] };
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
