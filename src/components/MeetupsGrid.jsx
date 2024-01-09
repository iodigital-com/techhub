const EVENT_DESCRIPTION_MAX_LENGTH = 250;

const MeetupsGrid = ({ events }) => (
  <div className="grid gap-4 gap-y-10 xl:grid-cols-2">
    {events.map((event) => (
      <a
        key={event.eventUrl}
        href={event.eventUrl}
        target="_blank"
        rel="noreferrer"
        className="border-t border-slate-200 pt-3"
      >
        <div className="text my-1.5 text-xl font-medium">{event.title}</div>
        <div>
          <div>
            {new Date(event.dateTime).toLocaleDateString(undefined, {
              dateStyle: 'long',
              timeZone: event.timezone,
            })}
            , &nbsp;
            <span>
              {new Date(event.dateTime).toLocaleTimeString(undefined, {
                timeStyle: 'short',
                timeZone: event.timezone,
                hour12: false,
              })}
              -
              {new Date(event.endTime).toLocaleTimeString(undefined, {
                timeStyle: 'short',
                timeZone: event.timezone,
                hour12: false,
              })}
            </span>
            &nbsp;({event.timezone})
          </div>
          <div>{event.groupName}</div>
        </div>
        <div>{event.description.trim().substring(0, EVENT_DESCRIPTION_MAX_LENGTH)}...</div>
        <svg style={{ width: 24, height: 24 }} className="text-gray-400" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
          />
        </svg>
      </a>
    ))}
  </div>
);

export default MeetupsGrid;
