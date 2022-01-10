const remainder = require('../models').table_remainder;

module.exports = {

    getAllFinance: async(req, res) => {

        try {
            const getAll = await remainder.findAll({where: {jenis_remainder: 'finance'}})
            if(getAll != null){
                res.status(200).json({status_code: 200, data: getAll[0]})
            } else {
                res.status(400).json({status_code: 400, message: 'Tidak ada data!'});
            }
        } catch (error) {
            res.status(500).json({status_code: 500, message: error.message})
        }

    },

    createFinance: async(req, res) => {
        
        try {
            let obj = {
                jenis_remainder: 'finance',
                nama_remainder : req.body.nama_remainder,
                tagihan : req.body.tagihan,
                tgl_tagihan_telah_lunas : req.body.tgl_tagihan_telah_lunas,
                tgl_jatuh_tempo : req.body.tgl_jatuh_tempo,
                status : req.body.status
            }
            if(obj.jenis_remainder == '' || obj.nama_remainder == '' || obj.tgl_jatuh_tempo == ''){
                res.status(400).json({status_code: 400, message: 'Jangan kosongkan filed yang harus di isi'});
            } else {
                await remainder.create(obj)
                .then(data => {
                    res.status(201).json({status_code: 201, data});
                })
            }
        } catch (error) {
            res.status(500).json({status_code: 500, message: error.message});
        }

    }, 

    fetchEdit: async(req, res) => {
        
        try {

            const id = req.params.id;
            const fetch = await remainder.findOne({where: {id: id, jenis_remainder: 'finance'}});
            if(fetch != null){
                res.status(200).json({status_code: 200, data: fetch});
            } else {
                res.status(400).json({status_code: 400, message: "Tidak ada data"});
            }

        } catch (error) {
            
            res.status(500).json({status_code: 500, message: error.message});

        }
    },

    editById: async(req, res) => {

        try {
            const id_remainder = req.params.id;
            const obj = {
                jenis_remainder: 'finance',
                nama_remainder : req.body.nama_remainder,
                tagihan : req.body.tagihan,
                tgl_tagihan_telah_lunas : req.body.tgl_tagihan_telah_lunas,
                tgl_jatuh_tempo : req.body.tgl_jatuh_tempo,
                status : req.body.status
            }    
            const finance_remainder = await remainder.findOne({where: {id: id_remainder, jenis_remainder: 'finance'}});
            if(finance_remainder !== null){
                await remainder.update(obj, {where: {id: id_remainder}})
                .then( result => {
                    console.log(result)
                    res.status(200).json({status_code: 200, message: "Data Updated!"});
                });
            } else {
                res.status(400).json({status_code: 400, message: "Data tidak di temukan"});
            }

        } catch (error) {
            res.status(500).json({status_code: 500, message: error.message});
        }

    },

    editBayar: async(req, res) => {
        
        try {
            const id_remainder = req.params.id;
            const finance_remainder = await remainder.findOne({where: {id: id_remainder, jenis_remainder: 'finance'}});

            if(finance_remainder !== null){

                let tglTerbayar = finance_remainder.tgl_tagihan_telah_lunas;
                let tglJth = finance_remainder.tgl_jatuh_tempo;
                let jth = tglJth.split('-');
                let jthDay = jth[0];
                let jthMonth = jth[1];
                let jthYear = jth[2];

                let jthTmpBru;
                let tagihanLunas;

                if(jthMonth == 12){
                
                    tagihanLunas = tglJth;
                    jthTmpBru = `${jthDay}-01-${parseInt(jthYear)+1}`;
                
                } else {
                    
                    if(parseInt(jthMonth)+1 == 2 && jthDay > 28){
                    
                        tagihanLunas = tglJth;
                        jthTmpBru = `28-${String(parseInt(jthMonth)+1).padStart(2, '0')}-${jthYear}`
                    
                    } else {
                        
                        if(jthMonth != 2){
                            
                            tagihanLunas = tglJth;
                            jthTmpBru = `${jthDay}-${String(parseInt(jthMonth)+1).padStart(2, '0')}-${jthYear}`
                        
                        } else {

                            let tgl = tglTerbayar.split('-');
                            
                            if(tgl[0] != jthDay){

                                tagihanLunas = `${tgl[0]}-${jthMonth}-${jthYear}`
                                jthTmpBru = `${tgl[0]}-${String(parseInt(jthMonth)+1).padStart(2, '0')}-${jthYear}`

                            } else {

                                tagihanLunas = tglJth;
                                jthTmpBru = `${jthDay}-${String(parseInt(jthMonth)+1).padStart(2, '0')}-${jthYear}`
                            
                            }

                        }
                    }
                }
                
                let obj = {
                    tgl_tagihan_telah_lunas: tagihanLunas,
                    tgl_jatuh_tempo: jthTmpBru,
                    status: "Lunas"
                }
                
                await remainder.update(obj, {where: {id: id_remainder}})
                .then( result => {
                    res.status(200).json({status_code: 200, message: "Tagihan telah di bayar"})
                })

            } else {
                res.status(400).json({status_code:400, message: "Tidak ada data"});
            }

        } catch (error) {
            
            res.status(500).json({status_code: 500, message: error.message});

        }

    },

    deleteRemainder: async(req, res) => {

        try {
            let id = req.params.id;
            let remaind = await remainder.findOne({where: {id:id, jenis_remainder: 'finance' }});
            if(remaind != null){
                await remainder.destroy({where: {id: id, jenis_remainder: 'finance'}})
                .then( result => {
                    res.status(200).json({status_code: 200, message: `Remainder ${remaind.nama_remainder} telah berhasil di hapus!`})
                })
            } else {
                res.status(400).json({status_code: 400, message: 'Tidak ada data yang di hapus!'})
            }

        } catch (error) {
            res.status(500).json({status_code: 500, message: error.message});
        }
    }
}