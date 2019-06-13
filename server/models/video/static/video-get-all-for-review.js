"use strict";

const { IDS } = require('../../../constants/channelIds');

module.exports = function (Video) {
  Video.getAllForReview = function (yChanelId) {
    const { VideoFragment } = Video.app.models;

    const  getAllForReview = async () => {
      for (const id of IDS) {
        await Video.renewChanelVideoList(id);
      }

      const videos = await Video.find({
        where: {
          reviewed: false,
          'yVideoInfo.snippet.channelId': {
            inq: IDS,
          },
        }
      });

      for (const video of videos) {
        video.videoFragmentCount = await VideoFragment.count({ yVideoId: video.yVideoId })
      }

      return videos;
    };

    return getAllForReview();
  };

  Video.remoteMethod('getAllForReview', {
    "accepts": [],
    "returns": [
      {
        "type": "array",
        "root": true,
      }
    ],
    "http": [
      {
        "verb": "get",
        path: '/getAllForReview'
      }
    ]
  })
};
