const fs = require('fs');
const path = require('path');

require('dotenv').config();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const getEvents = async () => {
  const baseURL = 'https://covenofwisdom.io/api/events';

  const events = await fetch(baseURL)
    .then((res) => res.json())
    .catch((err) => console.error(err));

  fs.writeFileSync(path.resolve('src/data/events.json'), JSON.stringify(events));
};

getEvents();
