export async function getMeetups() {
  const response = await fetch('https://covenofwisdom.io/api/events')
  const { upcomingEvents } = await response.json()

  return upcomingEvents.filter(({ dateTime }) => {
    const eventDate = Date.parse(dateTime)
    const currentDate = Date.now()
    return eventDate >= currentDate
  })
}
