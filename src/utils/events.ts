import events from '@data/events.json';

export function getEvents() {
  const { upcomingEvents } = events as { upcomingEvents: Events[] };
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

export interface Events {
  title: string;
  description: string;
  venue: Venue;
  eventUrl: string;
  dateTime: string;
  endTime: string;
  timezone: string;
  groupName: string;
}

export interface Venue {
  name: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
}

export type EventsType = ReturnType<typeof getEvents>;
