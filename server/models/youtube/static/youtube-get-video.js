"use strict";

const fs = require('fs');
const ytdl = require('ytdl-core');

function getYld(videoId) {
  return ytdl(
    videoId,
    {
      filter: function (format) {
        return format.container === 'mp4' && format.audioBitrate && format.resolution
      },
      quality: 'lowest',
    }
  )
}

async function responseWidthLoad(ctx, videoId) {
  const videoFilePath = videoId + '.mp4';
  if (!fs.existsSync(videoFilePath)) {
    await new Promise((res, rej) => {
      const writeStream = fs.createWriteStream(videoFilePath);

      getYld(videoId).pipe(writeStream);

      writeStream.on('close', res);
    });
  }

  const stat = fs.statSync(videoFilePath);
  const total = stat.size;
  ctx.res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
  fs.createReadStream(videoFilePath).pipe(ctx.res);
}

async function responsePipeGoogle(ctx, videoId) {
  getYld(videoId).pipe(ctx.res);
}

module.exports = function (GlobalList) {
  GlobalList.getLowestVideo = function (ctx, videoId = 'LkPDFZnc-Z8') {
    const  searchList = async () => {
      await responsePipeGoogle(ctx, videoId);

      await new Promise(res => setTimeout(res, 10000))
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
