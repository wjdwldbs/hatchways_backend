let assert = require('assert');
let chai = require('chai');
var expect = chai.expect;
var request = require("request");

describe('GET route1', (done) => {
  it('should send back SUCCESSFUL status code of 200 for successful API request', (done) => {
    request.get('http://localhost:3000/api/ping', (error, response, body) => {
      assert.equal(response.statusCode, 200)
      done();
    });
  });

  it('should send back SUCCESSFUL response body for successful API request', (done) => {
    let success = {
      success: true
    }
    request.get('http://localhost:3000/api/ping', (error, response, body) => {
      assert.deepEqual(JSON.parse(body), success);  
      done();
    });
  });

  it('should send back UNSUCCESSFUL status code for invalid URL route', (done) => {
    request.get('http://localhost:3000/api/noping', (error, response, body) => {
      assert.equal(response.statusCode, 404)
      done();
    });
  });

});

describe('GET route2', (done) => {

  const tags = ['tech', 'health', 'history', 'science', 'startups', 'design', 'culture', 'politics']
  const sortByFields = ['id', 'reads', 'likes', 'popularity'];
  const directionFields = ['desc', 'asc'];

  it('should send back SUCCESSFUL status code of 200 for successful request', (done) => {
    request.get(`http://localhost:3000/api/posts?tags=${tags[Math.floor(Math.random() * tags.length)]}&sortBy=${sortByFields[Math.floor(Math.random() * sortByFields.length)]}&direction=${directionFields[Math.floor(Math.random() * directionFields.length)]}`, (error, response, body) => {
      assert.equal(response.statusCode, 200)
      done();
    });
  });

  it('should send back SUCCESSFUL response body that contains property "posts" for successful API request', (done) => {
    let success = {
      posts: true
    }
    request.get(`http://localhost:3000/api/posts?tags=${tags[Math.floor(Math.random() * tags.length)]}&sortBy=${sortByFields[Math.floor(Math.random() * sortByFields.length)]}&direction=${directionFields[Math.floor(Math.random() * directionFields.length)]}`, (error, response, body) => {
      assert.equal(JSON.parse(body).hasOwnProperty('posts'), success.hasOwnProperty('posts'));  
      done();
    });
  });

  it('should send back UNSUCCESSFUL status code for incorrect URL path', (done) => {
    request.get('http://localhost:3000/api/post', (error, response, body) => {
      assert.equal(response.statusCode, 404)
      done();
    });
  });

  it('should send back UNSUCCESSFUL status code for missing "tag" query params', (done) => {
    request.get('http://localhost:3000/api/posts', (error, response, body) => {
      assert.equal(response.statusCode, 400)
      done();
    });
  });

  it('should send back SUCCESSFUL status code for default sortBy & direction query params', (done) => {
    request.get(`http://localhost:3000/api/posts?tags=${tags[Math.floor(Math.random() * tags.length)]}`, (error, response, body) => {
      assert.equal(response.statusCode, 200)
      done();
    });
  });

  it('should set default query params sortBy value to "id" & direction value to "asc"', (done) => {
    request.get(`http://localhost:3000/api/posts?tags=${tags[Math.floor(Math.random() * tags.length)]}`, (error, response, body) => {
      let ids = [];
      let sortedIDs = [];
      let sorted = true;
      body = JSON.parse(body);

      for (let i = 0; i < body.posts.length; i++){
        ids.push(body.posts[i].id);
        sortedIDs.push(body.posts[i].id);
      }

      sortedIDs = sortedIDs.sort((a, b) => {
        return a - b;
      })

      for (let i = 0; i < ids.length; i++){
        if (ids[i] !== sortedIDs[i]){
          sorted = false;
        }
      }

      assert.equal(sorted, true);
      done();
    });
  });

  it('should send back SUCCESSFUL status code for multiple "tag" query params', (done) => {
    request.get(`http://localhost:3000/api/posts?tags=${tags[Math.floor(Math.random() * tags.length)]},${tags[Math.floor(Math.random() * tags.length)]}`, (error, response, body) => {
      assert.equal(response.statusCode, 200)
      done();
    });
  });

  it('should send back UNIQUE data entries for multiple "tag" query params', (done) => {
    let ids = [];
    let unique = true;
    request.get(`http://localhost:3000/api/posts?tags=${tags[Math.floor(Math.random() * tags.length)]},${tags[Math.floor(Math.random() * tags.length)]}`, (error, response, body) => {
      body = JSON.parse(body);
      for (let i = 0; i < body.posts.length; i++){
        if (ids.indexOf(body.posts[i].id) === -1){
          ids.push(body.posts[i].id);
        } else {
          unique = false;
        }
      }
      assert.equal(unique, true);
      done();
    });
  });
});