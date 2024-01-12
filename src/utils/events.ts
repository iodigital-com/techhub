import events from '@data/events';

export function getEvents() {
  const { upcomingEvents } = events;
  return upcomingEvents.filter(({ dateTime }) => {
    const eventDate = Date.parse(dateTime);
    const currentDate = Date.now();
    return eventDate >= currentDate;
  });
}

export type EventsType = ReturnType<typeof getEvents>;
