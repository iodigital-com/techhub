import events from '@data/events';
import { getAllJobs } from '@utils/jobs.ts';

export function getEvents() {
  const { upcomingEvents } = events;
  return upcomingEvents.filter(({ dateTime }) => {
    const eventDate = Date.parse(dateTime);
    const currentDate = Date.now();
    return eventDate >= currentDate;
  });
}

export function getLatestEvents(num = 5) {
  const events = getEvents();
  return events.slice(0, num);
}

export type EventsType = ReturnType<typeof getEvents>;
