"use strict";

const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = function (GlobalList) {
  GlobalList.getLowestVideoFormat = function (videoId = 'LkPDFZnc-Z8') {
    const  searchList = async () => {
      const a = await new Promise(res => {
        ytdl.getInfo(
          videoId,
          (err, info) => {
            if (err) throw err;
            let format = ytdl.chooseFormat(info.formats, {
              filter: function (format) {
                return format.container === 'mp4' && format.audioBitrate
              },
              quality: 'lowest',
            });
            if (format) {
              res(format)
            }
          });
      });
      // // await ytdl.getInfo('https://www.youtube.com/watch?v=LkPDFZnc-Z8', (err, info) => {
      // //   a = info.formats;
      // // });
      // const a = await new Promise(res => {
      //   ytdl.getInfo('https://www.youtube.com/watch?v=LkPDFZnc-Z8', (err, info) => {
      //     res(info.formats);
      //   });
      // })


      return a;
    };

    return searchList();
  };

  GlobalList.remoteMethod('getLowestVideoFormat', {
    "accepts": [{
      'arg': 'videoId', type: 'string', http: { source: 'path' }
    }],
    "returns": [
      {
        "type": "any",
        "root": true,
      }
    ],
    "http": [
      {
        verb: "get",
        path: "/getLowestVideoFormat/:videoId"
      }
    ]
  })
};
