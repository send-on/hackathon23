// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { NextResponse } from 'next/server';

function reduceArrayToObject(data) {
  let id = 1;
  return data.data.map(item => ({
    id: id++,
    event: item.event,
    timestamp: item.timestamp,
    properties: item.properties,
  }));
}

function objectToArray(traits) {
  let id = 1;
  return Object.entries(traits).map(([key, value]) => ({
    id: id++,
    key,
    value,
  }));
}

function base64Encode(str) {
  return btoa(encodeURIComponent(str+":").replace(/%([0-9A-F]{2})/g,
    function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1);
  }));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  
  const user = req.body.data.user;
  const profileKey = req.body.data.profileKey;
  const spaceID = req.body.data.spaceID;

  let config_traits = {
    method: 'get',
    url: `https://profiles.segment.com/v1/spaces/${spaceID}/collections/users/profiles/user_id:${user}/traits?limit=100`,
    headers: { 
      'Authorization': `Basic ${base64Encode(profileKey)}`
    }
  }

  let config_events = {
    method: 'get',
    url: `https://profiles.segment.com/v1/spaces/${spaceID}/collections/users/profiles/user_id:${user}/events?limit=100`,
    headers: { 
      'Authorization': `Basic ${base64Encode(profileKey)}`
    }
  }

  let traits_temp = {}
  await axios.request(config_traits)
  .then((res) => {
    traits_temp = res.data.traits
  })
  .catch((error) => {
    console.error(error);
  });

  let events_temp = {};
  await axios.request(config_events)
  .then((res) => {
    events_temp = res.data
  })
  .catch((error) => {
    console.error(error);
  });


  const events = reduceArrayToObject(events_temp);
  const traits = objectToArray(traits_temp);

  res.status(200).json({ traits, events })
}