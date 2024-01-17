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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const user = req.body.data.user;

  let config_traits = {
    method: 'get',
    url: `https://profiles.segment.com/v1/spaces/spa_8aoSVF3MKjU9t5Lq41jhb1/collections/users/profiles/user_id:${user}/traits?limit=100`,
    headers: { 
      'Authorization': 'Basic WjRselZwSUNjTGVTNGdmMUNsR3QtU3JlVXU2TkxMdFpYRjN1WjNsN0otUk55bnp6SUhYalJDVE9kc0xqbHY3XzNjQmlkYzhoaERxZWx6eEpUQy14bnVkZU91TFZXc21pVmNlTTQ2dnVVejFwRzVzeUN1TUFKN1FaYkhPTF9FQmViQXE2ajRUeVNoODU5RHpNRmZicUQ1VnoxWXFuVDZTRzQ2STFqc0RlUmplS1JVb3JfLW9xOWNiQ0QxOFJMY0tYWGFXQWVtQU1BRldiYzRPVXIxODBneG9zTHVVZi0tUmtGenRrRk03T3l2bHdVclhfSUtRUjRaLTlQTlNoMVI0c1lWbGxtN0lkaWRQb044RENVeTVGdXlPZVE4ST06'
    }
  }

  let config_events = {
    method: 'get',
    url: `https://profiles.segment.com/v1/spaces/spa_8aoSVF3MKjU9t5Lq41jhb1/collections/users/profiles/user_id:${user}/events?limit=100`,
    headers: { 
      'Authorization': 'Basic WjRselZwSUNjTGVTNGdmMUNsR3QtU3JlVXU2TkxMdFpYRjN1WjNsN0otUk55bnp6SUhYalJDVE9kc0xqbHY3XzNjQmlkYzhoaERxZWx6eEpUQy14bnVkZU91TFZXc21pVmNlTTQ2dnVVejFwRzVzeUN1TUFKN1FaYkhPTF9FQmViQXE2ajRUeVNoODU5RHpNRmZicUQ1VnoxWXFuVDZTRzQ2STFqc0RlUmplS1JVb3JfLW9xOWNiQ0QxOFJMY0tYWGFXQWVtQU1BRldiYzRPVXIxODBneG9zTHVVZi0tUmtGenRrRk03T3l2bHdVclhfSUtRUjRaLTlQTlNoMVI0c1lWbGxtN0lkaWRQb044RENVeTVGdXlPZVE4ST06'
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