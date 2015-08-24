'use strict';

var database = require('./database');
var async = require('async');

module.exports = {
    fetchCollection: function(callback) {
        database.query('SELECT * FROM posts', function(err, rows) {
            callback(err, rows);
        });
    },
    fetchById: function(id, callback) {
        database.query(
            'SELECT * FROM posts WHERE id = ? LIMIT 1',
            [id],
            function(err, rows) {
                if (rows.length === 0) {
                    err = new Error('No post with id ' + id + '.');
                    err.name = 'InvalidArgumentError';
                }
                callback(err, rows[0]);
            }
        );
    },
    create: function(post, callback) {
        async.waterfall([
            function(callback) {
                database.query(
                    'INSERT INTO posts SET ?',
                    [post],
                    function(err, result) {
                        callback(err, result);
                    }
                );
            },
            function(result, callback) {
                module.exports.fetchById(result.insertId, callback);
            },
        ], callback);
    },
    updateById: function(id, post, callback) {
        async.waterfall([
            function(callback) {
                database.query('UPDATE posts SET ? WHERE id = ?',
                    [post, id],
                    function(err, result) {
                        if (!err && result.affectedRows === 0) {
                            err = new Error('No post with id ' + id + '.');
                            err.name = 'InvalidArgumentError';
                        }
                        callback(err, id);
                    }
                );
            },
            function(id, callback) {
                module.exports.fetchById(id, callback);
            },
        ], callback);
    },
    deleteById: function(id, callback) {
        database.query(
            'DELETE FROM posts WHERE id = ?',
            [id],
            function(err, result) {
            if (!err && result.affectedRows === 0) {
                err = new Error('No post with id ' + id + '.');
                err.name = 'InvalidArgumentError';
            }
            callback(err);
        });
    },
};
