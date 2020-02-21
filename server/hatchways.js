const axios = require('axios');

const APIcalls = {
  fetchData: (tag, callback) => {
    axios.get(`https://hatchways.io/api/assessment/blog/posts`, {
      params: tag
    })
    .then(results => {
      res.status(2002).send(results.data);
    })
    .catch(err => {
      res.status(400).send(`Unsuccessful getAllData request due to following error: ${err}`);
    })
  }
 
}


module.exports = APIcalls;

 // fetchData: (tag, callback) => {

  //   let options = {
  //     method: 'GET',
  //     url: `https://hatchways.io/api/assessment/blog/posts`,
  //     qs: tag
  //   }
  
  //   request(options, (err, res, body) => {
  //     if (err) {
  //      console.log(`Unsuccessful API requst: ${err}`);
  //      callback(err, null);
  //     } else {
  //       console.log('SUCCESSFUL API REQUEST!');
  //       callback(null, body);
  //     }
  //   })
  // }