"use strict";

const google = require('googleapis');

module.exports = function (GlobalList) {
  GlobalList.searchPopular = function () {
    const  searchPopular = async () => {
      const youtube = new google.youtube_v3.Youtube({
        auth: GlobalList.app.get('googleApiKey'),
      });

      const categoryList = await youtube.videoCategories.list({
        part: 'snippet',
        regionCode: 'US',
      });

      const dAfter = new Date();
      dAfter.setDate(dAfter.getDate() - 5);
      const dBefore = new Date();
      dBefore.setDate(dBefore.getDate() - 4);

      const videoList = await youtube.search.list({
        part: 'snippet',
        q: '',
        type: 'video',
        videoCategoryId: '23',
        videoDuration: 'short',
        publishedAfter: dAfter.toISOString(),
        publishedBefore: dBefore.toISOString(),
        order: 'viewCount',
        maxResults: 50,
      });

      return videoList.data.items;

    };

    return searchPopular();
  };

  GlobalList.remoteMethod('searchPopular', {
    "accepts": [],
    "returns": [
      {
        "arg": "video-list",
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
