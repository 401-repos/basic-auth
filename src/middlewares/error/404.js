'use strict';

module.exports = (req, res)=>{
    res.status(404).json({
        error: res.status,
        message: "bad route or method",
        path: req.path
    });
}