const axios = require('axios');

const controller = {
  fetchData: ({ query }, res) => {
    const { tag } = query;
    axios.get(`https://hatchways.io/api/assessment/blog/posts`, {
      params: {
        tag: tag
      }
    })
    .then(results => {
      res.status(200).send(results.data);
    })
    .catch(err => {
      res.status(400).send(`Unsuccessful getAllData request due to following error: ${err}`);
    })
  },

  fetchDataTags: ({ query }, res) => {
    const { tags, sortBy, direction } = query;
    const sortByFields = ['id', 'reads', 'likes', 'popularity'];
    const directionFields = ['desc', 'asc'];
    if (!tags){
      res.status(400).send( 'Tags parameter is required')
    }
    
    if (sortByFields.indexOf(sortBy) === -1){
      res.status(400).send({error: 'sortBy parameter is invalid'})
    }

    if (directionFields.indexOf(direction) === -1){
      res.status(400).send({error: 'directionFields parameter is invalid'})
    }

    axios.get(`https://hatchways.io/api/assessment/blog/posts`, {
      params: {
        tag: tags,
        sortBy: sortBy,
        direction: direction
      }
    })
    .then(results => {
      res.status(200).send(results.data);
    })
    .catch(err => {
      res.status(400).send(`Unsuccessful getAllData request due to following error: ${err}`);
    })
  }
 
}

module.exports = controller;
