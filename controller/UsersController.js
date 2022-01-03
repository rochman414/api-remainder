const users = require('../models').users;

module.exports = {
    addUsers: async(req, res) => {
        try {
            const user = await users.findOne({where: { username: req.body.username }})
            
            if(user != null)
            {
                res.status(400).json({status_code: 400, message: `Username sudah ada!`});

            } else if(req.body.username == '' || req.body.password == ''){

                return res.status(400).json({status_code: 400, message:'Field tidak boleh kosong!'});
            
            } else {

                let obj = {
                    username: req.body.username,
                    password: req.body.password
                }
                await users.create(obj)
                .then(data => {
                    return res.status(201).json({status_code: 201, data})
                })

            }
        } catch (error) {

            return res.status(500).json({status_code: 500, error})

        }
    }
}