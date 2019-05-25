"use strict";

const google = require('googleapis');

function getDayStart(daysBeforeToday) {
  const getDayStart = new Date();
  getDayStart.setHours(0,0,0,0);
  getDayStart.setDate(getDayStart.getDate() - daysBeforeToday);

  return getDayStart.toISOString();
}

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
