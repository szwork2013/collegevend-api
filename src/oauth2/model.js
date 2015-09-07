'use strict';

var async = require('async');

var RefreshToken = require('../models/refreshToken');
var Client = require('../models/client');
var User = require('../models/user');
var redis = require('../services/redis');

function getClient(clientId, clientSecret, cb) {
  Client.findOne(
    { clientId: clientId },
    'clientId clientSecret',
    { lean: true },
    function(err, client) {
      if (err) {
        return cb(err);
      }
      if (!client || client.clientSecret !== clientSecret) {
        return cb(null, false);
      }
      return cb(null, client);
    }
  );
}

function grantTypeAllowed(clientId, grantType, cb) {
  Client.findOne(
    { clientId: clientId },
    'clientId grantTypes',
    { lean: true },
    function(err, client) {
      if (err) {
        return cb(err);
      }
      if (typeof client.grantTypes !== 'object') {
        return cb(null, false);
      }
      if (client.grantTypes[grantType] !== true) {
        return cb(null, false);
      }
      return cb(null, true);
    }
  );
}

function getUser(username, password, cb) {
  User.findOne(
    { username: username },
    '_id password',
    function onFindOneUser(err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      user.comparePassword(
        password,
        function onComparePassword(err, matches) {
          if (err) {
            return cb(err);
          }
          if (!matches) {
            return cb(null, false);
          }
          cb(null, { id: user._id });
        }
      );
    }
  );
}

function saveAccessToken(accessToken, clientId, expires, user, cb) {
  var today = new Date();
  expires = Math.ceil((expires.getTime() - today.getTime()) / 100);
  var key = 'access_token:' + accessToken;
  async.waterfall([
    function wrapSetAccessToken(cb) {
      redis.set(key, user.id, function onSetAccessToken(err) {
        cb(err);
      });
    },
    function wrapExpireAccessToken(cb) {
      redis.expire(key, expires, function onExpireAccessToken(err) {
        cb(err);
      });
    },
  ], function onCompleteSaveAccessToken(err) {
    cb(err);
  });
}

function saveRefreshToken(refreshToken, clientId, expires, user, cb) {
  var token = new RefreshToken({
    refreshToken: refreshToken,
    clientId: clientId,
    userId: user.id,
    expires: expires,
  });
  token.save(function onSaveRefreshToken(err) {
    cb(err);
  });
}

function getRefreshToken(refreshToken, cb) {
  RefreshToken.findOne(
    { refreshToken: refreshToken },
    'clientId userId',
    { lean: true },
    function onFindRefreshToken(err, token) {
      if (err) {
        return cb(err);
      }
      return cb(err, token);
    }
  );
}

function revokeRefreshToken(refreshToken, cb) {
  RefreshToken.findOneAndRemove(
    { refreshToken: refreshToken },
    { lean: true },
    function onRemoveRefreshToken(err) {
      cb(err);
    }
  );
}

module.exports = {
  getClient: getClient,
  grantTypeAllowed: grantTypeAllowed,
  getUser: getUser,
  saveAccessToken: saveAccessToken,
  saveRefreshToken: saveRefreshToken,
  getRefreshToken: getRefreshToken,
  revokeRefreshToken: revokeRefreshToken,
};
