const {users} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

    fetchAll: async(req, res) => {
        try {            
            const getUser = await users.findAll();

            if(getUser != null){
                res.status(200).json({status_code: 200, data: getUser})
            } else {
                res.status(404).json({status_code: 404, message: "Tidak ada data!"})
            }
        } catch (error) {
            res.status(500).json({status_code: 500, message: error.message})
        }
    },

    addUsers: async(req, res) => {
        console.log(req.body)
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
                    return res.status(201).json({status_code: 201, message: "Data berhasil di buat!",data})
                })

            }
        } catch (error) {

            return res.status(500).json({status_code: 500, message: error.message})

        }
    },

    fetchEdit: async(req, res) => {
        try {
            const id_user = req.params.id;
            const fetchUser = await users.findOne({where : {id: id_user }});

            if(fetchUser != null){
                res.status(200).json({status_code: 200, data:fetchUser});
            } else {
                res.status(404).json({status_code: 404, message: "Tidak ada Data!"});
            }
        } catch (error) {
            res.status(500).json({status_code: 500, message: error.message});
        }
    },

    editById: async(req, res) => {
        try {
            const id_user = req.params.id;
            const obj = {
                username: req.body.username,
                password: req.body.password
            }
            const user = await users.findOne({where: {id: id_user}})
            if(user !== null){

                await users.update(obj, {individualHooks: true ,where: {id: id_user}})
                .then((result) => {
                    res.status(200).json({status_code: 200, message: "Data Updated!", data: result[1][0]})
                })
                
            } else {
                res.status(404).json({status_code: 404, message: "Data not found!"});
            }
        } catch (error) {
            res.status(500).json({status_code: 500, message: error.message});
        }
    },

    deleteById: async(req, res) => {
        try {
            const id_user = req.params.id;
            const deleteId = await users.destroy({where : {id: id_user}});
            if(deleteId){
                res.status(200).json({status_code: 200, message: "Data berhasil di hapus!"});
            } else {
                res.status(404).json({status_code: 404, message: "Data tidak berhasil di hapus!"});
            }
        } catch (error) {
            res.status(500).json({status_code: 500, message: error.message});
        }
    }
    
}