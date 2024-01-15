const axios = require('axios');

export const prapiTraits = async (user: string) => {
  let config = {
    method: 'get',
    url: `https://profiles.segment.com/v1/spaces/spa_8aoSVF3MKjU9t5Lq41jhb1/collections/users/profiles/user_id:${user}/traits?limit=100`,
    headers: { 
      'Authorization': 'Basic WjRselZwSUNjTGVTNGdmMUNsR3QtU3JlVXU2TkxMdFpYRjN1WjNsN0otUk55bnp6SUhYalJDVE9kc0xqbHY3XzNjQmlkYzhoaERxZWx6eEpUQy14bnVkZU91TFZXc21pVmNlTTQ2dnVVejFwRzVzeUN1TUFKN1FaYkhPTF9FQmViQXE2ajRUeVNoODU5RHpNRmZicUQ1VnoxWXFuVDZTRzQ2STFqc0RlUmplS1JVb3JfLW9xOWNiQ0QxOFJMY0tYWGFXQWVtQU1BRldiYzRPVXIxODBneG9zTHVVZi0tUmtGenRrRk03T3l2bHdVclhfSUtRUjRaLTlQTlNoMVI0c1lWbGxtN0lkaWRQb044RENVeTVGdXlPZVE4ST06'
    }
  };

  axios.request(config)
  .then((res) => {
    return (JSON.stringify(res.data));
  })
  .catch((error) => {
    console.log(error);
  });

}

