'use strict';

module.exports = (error, req, res, next) => {
    res.status(500).json({
        error: error,
        body: req.body,
        message: `Server error 500 ${error.message}`,
        path: req.path,
        query: req.query
    });
}