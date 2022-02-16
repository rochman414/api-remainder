const {users} = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {

    dologin: async(req, res) => {
        
        let username = req.body.username;
        let password = req.body.password;

        try {
            const user = await users.findOne({where: {username: username}});
            if(user != null){
                const match = await bcrypt.compare(password, user.password);

                if(match){
                    const token = jwt.sign({id: user.id, username: user.username}, process.env.SECREAT);
                    res.status(200).json({status_code: 200, token: token});
                } else {
                    res.status(400).json({status_code: 400, message: 'Password salah!'});
                }
                
            } else {
                res.status(404).json({status_code: 404, message: 'Username Tidak Terdaftar!'})
            }

        } catch (error) {
            res.status(500).json({status_code: 500, message: error.message});
        }
        
    }
}