"use strict";

const { IDS } = require('../../../constants/channelIds');

module.exports = function (Video) {
  Video.getAllForReview = function (yChanelId) {
    const  getAllForReview = async () => {
      for (const id of IDS) {
        await Video.renewChanelVideoList(id);
      }

      return await Video.find({
        where: {
          reviewed: false,
          'yVideoInfo.snippet.channelId': {
            inq: IDS,
          },
        }
      });
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
