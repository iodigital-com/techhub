import jobs from '@data/jobs.json';
import stringSimilarity from 'string-similarity';
import { getDateTime } from '@utils/getDateTime.ts';

export const getJobs = () =>
  (jobs.jobs as Jobs).toSorted((a, b) => getDateTime(b.published_at) - getDateTime(a.published_at));

export const getLatestJobs = (num = 5) => getJobs().slice(0, num);

export const getRelatedJobs = (num = 5, searchString: string) => {
  const jobs = getJobs();

  const matchedJobs = jobs.map((job) => {
    const tagString = job.tags.tag instanceof Array ? job.tags.tag.join(' ') : job.tags.tag || '';
    const titleAndTags = `${job.title} || ${tagString}`;
    const score = stringSimilarity.compareTwoStrings(searchString, titleAndTags);

    return {
      job,
      score,
    };
  });

  return matchedJobs
    .toSorted((a, b) => b.score - a.score)
    .map((a) => a.job)
    .slice(0, num);
};

export interface Job {
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
  tags: {
    tag: string | string[];
  };
  min_hours: any;
  max_hours: any;
  careers_url: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  closed: string;
}

export type Jobs = Job[];
