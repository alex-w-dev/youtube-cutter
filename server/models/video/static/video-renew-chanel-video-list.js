"use strict";

const google = require('googleapis');

module.exports = function (Video) {
  Video.renewChanelVideoList = function (yChanelId) {
    const  renewChanelVideoList = async () => {
      const youtube = new google.youtube_v3.Youtube({
        auth: Video.app.get('googleApiKey'),
      });

      const videoList = await youtube.search.list({
        part: 'snippet',
        q: '',
        type: 'video',
        channelId: yChanelId,
        order: 'date',
        maxResults: 50,
      });

      for (const item of videoList.data.items) {
        if (!(await Video.count({ 'yVideoId': item.id.videoId  }))) {
          await Video.create({
            yVideoInfo: item,
            yVideoId: item.id.videoId,
          });
        }
      }

      console.log(await Video.count(), 'await Video.count()');

      return videoList.data;
    };

    return renewChanelVideoList();
  };

  Video.remoteMethod('renewChanelVideoList', {
    "accepts": [{
      arg: 'yChanelId', type: 'string', http: {source: 'path'}, required: true
    }],
    "returns": [
      {
        "type": "array",
        "root": true,
      }
    ],
    "http": [
      {
        "verb": "get",
        path: '/renewChanelVideoList/:yChanelId'
      }
    ]
  })
};
