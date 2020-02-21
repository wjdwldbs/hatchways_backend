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

    if(tags.indexOf(',') !== -1){

      const tagsCollection = tags.split(',');
      const allResults = tagsCollection.map((tag) => {
        //return axios.get(`https://hatchways.io/api/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}&direction=${direction}`)
        return axios.get(`https://hatchways.io/api/assessment/blog/posts`, {
          params: {
            tag: tag,
            sortBy: sortBy,
            direction: direction
          }
        })
      })

      axios.all(allResults)
      .then(axios.spread((...responses) => {
        let dataCollection = {};
        responses.forEach(response => {
          for (var i = 0; i < response.data.posts.length; i++){
            let singleData = response.data.posts[i]
            dataCollection[singleData.id] = singleData;
          }
        })
        let allCollection = Object.values(dataCollection);
        if (sortBy){
          if (direction === 'desc'){
            allCollection = allCollection.sort((a, b) => (
              b[sortBy] - a[sortBy]
            ))
          } else {
            allCollection = allCollection.sort((a, b) => (
              a[sortBy] - b[sortBy]
            ))
          }
        }
        res.status(200).send(allCollection)
      }))
      .catch(err => {
        res.status(400).send({
          error: 'Tags parameter is required'
        })
      });

    } else {

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
}

module.exports = controller;
