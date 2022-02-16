const {users} = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    authentication : (req, res, next) => {
        const token = req.headers.token;
        if(!token){
            res.status(404).json({status_code: 404, message: 'Token tidak di temukan!'});
        }

        jwt.verify(token, process.env.SECREAT, (err, decode) => {
            if(err){
                res.status(500).json({status_code: 500, message: err.message});
            } else {
                req.userData = decode;
                users.findOne({where : {id : req.userData.id}})
                .then(data => {
                    if(data){
                        next();
                    } else {
                        res.status(404).json({status_code: 404, message: 'User tidak ada!'});
                    }
                })
                .catch(error => {
                    res.status(500).json({status_code: 500, message: error.message});
                })
            }
        });
    }
}
