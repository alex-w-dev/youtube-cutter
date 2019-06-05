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

  return fs.createReadStream(videoFilePath)
}

async function responsePipeGoogle(ctx, videoId) {
  return getYld(videoId)
    .on('response', (res) => {
      ctx.res.set(res.headers);
      ctx.res.set('Access-Control-Expose-Headers', 'content-length');
    });
}

module.exports = function (GlobalList) {
  GlobalList.getLowestVideo = function (ctx, videoId) {
    const  searchList = async () => {
      const stream = await responsePipeGoogle(ctx, videoId);

      stream.pipe(ctx.res);

      return await new Promise((res, rej) => {
        stream.on('end', res);
        stream.on('error', rej);
      });
    };

    return searchList();
  };

  GlobalList.remoteMethod('getLowestVideo', {
    "accepts": [ {
      'arg': 'ctx', type: 'any', http: { source: 'context' }
    }, {
      'arg': 'videoId', type: 'string', required: true, http: { source: 'path' },
    }],
    "http": [
      {
        verb: "get",
        path: "/getLowestVideo/:videoId"
      }
    ]
  })
  GlobalList.afterRemoteError( 'getLowestVideo', function( ctx, next) {
    //...
    // next();
  });
};
