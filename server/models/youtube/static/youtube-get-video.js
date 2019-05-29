"use strict";

const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = function (GlobalList) {
  GlobalList.getLowestVideo = function (ctx, videoId = 'LkPDFZnc-Z8') {
    const  searchList = async () => {
      ytdl(videoId,
        {
          filter: function (format) {
            return format.container === 'mp4' && format.audioBitrate
          },
          quality: 'lowest',
        })
        .pipe(ctx.res);

      await new Promise(res => setTimeout(res, 20000))
    };

    return searchList();
  };

  GlobalList.remoteMethod('getLowestVideo', {
    "accepts": [ {
      'arg': 'ctx', type: 'any', http: { source: 'context' }
    }, {
      'arg': 'videoId', type: 'string', http: { source: 'path' },
    }],
    "http": [
      {
        verb: "get",
        path: "/getLowestVideo/:videoId"
      }
    ]
  })
};
