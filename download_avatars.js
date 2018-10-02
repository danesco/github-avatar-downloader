var request = require('request');
var token = require('./secrets.js')

console.log("Welcome to the Github avatar downloader!");

//2 Function
function getRepoContributors(repoOwner, repoName, cb){
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + '/' + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + token.GITHUB_TOKEN
      }
  };
  //3 Request call is made
  request(options, function(err, res, body){
    //4 call the callback
    var toObject = JSON.parse(body);
    cb(err, toObject);
  })
};

//1 Starting point                      //5 callback coming from number 4
getRepoContributors("jquery", "jquery", function(err, result){
  for(var key in result){
    console.log(result[key].avatar_url);
  }
});