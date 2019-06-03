"use strict";

module.exports = function (VideoFragment) {
  VideoFragment.getByYVideoId = function (yVideoId) {
    const  getByYVideoId = async () => {
      return await VideoFragment.find({
        where: {
          yVideoId,
        }
      })
    };

    return getByYVideoId();
  };

  GlobalList.remoteMethod('getByYVideoId', {
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
        path: '/getByYVideoId/:yVideoId'
      }
    ]
  })
};
