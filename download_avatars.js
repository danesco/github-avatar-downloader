var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');
var owner = process.argv[2];
var repo = process.argv[3];

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
    if (process.argv.length !== 4){
      console.log("You must give 2 arguments")
    }else{
      var toObject = JSON.parse(body);
      console.log(toObject.length);
      if (toObject.length === undefined){
        console.log("What you are trying to get does not exist!")
      }else{
      cb(err, toObject);
      }
    }
  })
};

//1 Starting point                      //5 callback coming from number 4
getRepoContributors(owner, repo, function(err, result){
  for(var key in result){
    downloadImageByURL(result[key].avatar_url, "avatars/" + result[key].login + ".png")
  }
});


function downloadImageByURL(url, filePath){
  request.get(url)
          .on("error", function(err){
            throw err;
          })
          .on("response", function(response){
            console.log("Status Code: ", response.statusCode);
          })
          .pipe(fs.createWriteStream(filePath));
}

