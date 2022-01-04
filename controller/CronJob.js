const cron = require('node-cron');
const users = require('../models').users;


function cek5detik() {  
    cron.schedule('1 * * * * *', function () {  
        users.findOne({where : {id: 1}})
        .then(data => {
            console.log(data, new Date(Date.now()).toString());
        })
    })
}
// cron.schedule('5 * * * * *', function cek5detik() {  
//     console.log('Muncul setiap 5 detik');
// })

module.exports = {
    cek5detik,
}   