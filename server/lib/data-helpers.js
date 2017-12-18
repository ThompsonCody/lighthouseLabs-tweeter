"use strict";

module.exports = function makeDataHelpers(db) {
  return {


    saveTweet: function(newTweet, callback) {

      console.log(db.collections)
      db.collection("tweets").insert(newTweet, callback);
    },

    getTweets: function(callback) {

      db.collection("tweets").find().toArray(callback);

    }

  };
}
