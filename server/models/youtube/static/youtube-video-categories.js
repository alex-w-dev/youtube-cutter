"use strict";

const google = require('googleapis');

module.exports = function (GlobalList) {
  GlobalList.videoCategories = function () {
    const  searchList = async () => {
      const youtube = new google.youtube_v3.Youtube({
        auth: GlobalList.app.get('googleApiKey'),
      });

      const categoryList = await youtube.videoCategories.list({
        part: 'snippet',
        regionCode: 'US',
      });

      categoryList.data.items = categoryList.data.items.filter(item => item.snippet.assignable)

      return categoryList.data;
    };

    return searchList();
  };

  GlobalList.remoteMethod('videoCategories', {
    "accepts": [],
    "returns": [
      {
        "arg": "list",
        "type": "any",
        "root": true,
      }
    ],
    "http": [
      {
        "verb": "get"
      }
    ]
  })
};
