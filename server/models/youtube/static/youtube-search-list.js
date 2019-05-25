"use strict";

const google = require('googleapis');

function getDayStart(daysBeforeToday) {
  const getDayStart = new Date();
  getDayStart.setHours(0,0,0,0);
  getDayStart.setDate(getDayStart.getDate() - daysBeforeToday);

  return getDayStart.toISOString();
}

module.exports = function (GlobalList) {
  GlobalList.searchList = function (daysBeforeToday = 0, videoCategoryId = 1) {
    const  searchList = async () => {
      const youtube = new google.youtube_v3.Youtube({
        auth: GlobalList.app.get('googleApiKey'),
      });

      const videoList = await youtube.search.list({
        part: 'snippet',
        q: '',
        type: 'video',
        videoCategoryId: videoCategoryId.toString(),
        videoDuration: 'short',
        publishedAfter: getDayStart(daysBeforeToday + 1),
        publishedBefore: getDayStart(daysBeforeToday),
        order: 'viewCount',
        maxResults: 50,
      });

      return videoList.data;

    };

    return searchList();
  };

  GlobalList.remoteMethod('searchList', {
    "accepts": [{
      arg: 'daysBeforeToday',
      type: 'number',
      http: { source: 'query' }
    }, {
      arg: 'videoCategoryId',
      type: 'number',
      http: { source: 'query' }
    }],
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
