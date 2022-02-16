require('dotenv').config();
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const {table_remainder} = require('../models');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_EMAIL 
    },
});

transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
});

function sendEmail(message) { 
    if(message.tagihan != null) {
        var htmlTe = `<!doctype html>
        <html>
        <head>
        </head>
        <body>
                <div style='text-align:center'>
                <h3>${message.subject}</h3>
                <h3 style='color:#${message.style}'>${message.message}</h3>
                <h3>Tagihan sebesar Rp.${message.tagihan}</h3>
                <h3>Tanggal Jatuh Tempo ${message.tgl}</h3>
                <p>Terimakasih</p>
                </div>
        </body>
        </html>`
    } else {
        var htmlTe = `<!doctype html>
                        <html>
                        <head>
                        </head>
                        <body>
                                <div style='text-align:center'>
                                <h3>${message.subject}</h3>
                                <h3 style='color:#${message.style}'>${message.message}</h3>
                                <h3>Tanggal Jatuh Tempo ${message.tgl}</h3>
                                <p>Terimakasih</p>
                                </div>
                        </body>
                        </html>`
    }

    let mailOption = {
        from: process.env.EMAIL,
        to: process.env.EMAIL_TO,
        subject: message.subject,
        html: htmlTe
    }

    transporter.sendMail( mailOption, (err,info) => {
        if(err) throw err;
        console.log(info.response);
    })  
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function ubahStatus(id, status) {  
    let obj = {
        status: status
    }
    table_remainder.update(obj, {where : {id:id}})
    .then(result => {
        console.log('Status Telah berubah');
    })
}

function cekTanggal() { 

    cron.schedule('5 9 * * *', function () { 
        table_remainder.findAll()
        .then( result => {
            result.forEach(data => {
    
                let id = data.id;
                let tglJth = data.tgl_jatuh_tempo;
                let tgh = data.tagihan;
    
                let jth = tglJth.split('-');
                let jthDay = jth[0];
                let jthMonth = jth[1];
                let jthYear = jth[2];
    
                let curentDate = new Date(Date.now());
                let cday = String(curentDate.getDate()).padStart(2, '0');
                let cmonth = String(curentDate.getMonth()+1).padStart(2, '0');
                let cyear = curentDate.getFullYear();
    
                let message;
                let selisih = jthDay - 7;
    
                if(cyear != jthYear){
    
                    if(cyear - jthYear > 0){
                        //Telat Bayar
                        message = {
                            subject: `Remainder ${data.jenis_remainder} ${data.nama_remainder}`,
                            message: `Segera bayar tagihan pada tanggal ${tglJth}, Sudah melebihi hari jatuh tempo`,
                            style: 'ff2424',
                            tgl : tglJth,
                            tagihan: tgh
                        }
                        ubahStatus(id, 'Telat Bayar');
                        sendEmail(message);
                    } else {
                        //Belum bayar
                        if(jthDay < 8){
                            //jika tgl jatuh tempo kurang dari tgl 8
                            if(selisih == 0){
                                //jika selisih = 0 maka kirim di akhir bulan sebelumnya
                                if(cday == daysInMonth(12, cyear)){
                                    message = {
                                        subject: `Remainder ${data.jenis_remainder} ${data.nama_remainder}`,
                                        message: 'Segera melakukan pembayaran Tagihan di bulan ini, Agar tidak melebihi hari jatuh tempo <br>Ini adalah notifikasi remainder 7 hari sebelum jatuh tempo',
                                        style: '00bd3f',
                                        tgl : tglJth,
                                        tagihan: tgh
                                    }
                                    ubahStatus(id, 'Belum Bayar');
                                    sendEmail(message);
                                }
                            } else {
                                //jika selisih < 0, bulan lalu di kurang selisih 
                                if(cday == (daysInMonth(12, cyear) - Math.abs(selisih))){
                                    message = {
                                        subject: `Remainder ${data.jenis_remainder} ${data.nama_remainder}`,
                                        message: 'Segera melakukan pembayaran Tagihan di bulan ini, Agar tidak melebihi hari jatuh tempo <br>Ini adalah notifikasi remainder 7 hari sebelum jatuh tempo',
                                        style: '00bd3f',
                                        tgl : tglJth,
                                        tagihan: tgh
                                    }
                                    ubahStatus(id, 'Belum Bayar');
                                    sendEmail(message);
                                }
                            }
                        }
                    }
                } else {
                
                    if(cmonth != jthMonth){
                
                        if(cmonth - jthMonth > 0){
                            //Telat Bayar
                            message = {
                                subject: `Remainder ${data.jenis_remainder} ${data.nama_remainder}`,
                                message: `Segera bayar tagihan pada tanggal ${tglJth}, Sudah melebihi hari jatuh tempo`,
                                style: 'ff2424',
                                tgl : tglJth,
                                tagihan: tgh
                            }
                            ubahStatus(id, 'Telat Bayar');
                            sendEmail(message);
                        } else {
                            //Belum bayar
                            if(jthDay < 8){
                                //jika tgl jatuh tempo kurang dari tgl 8
                                if(selisih == 0){
                                    //jika selisih = 0 maka kirim di akhir bulan sebelumnya
                                    if(cday == daysInMonth(cmonth, cyear)){
                                        message = {
                                            subject: `Remainder ${data.jenis_remainder} ${data.nama_remainder}`,
                                            message: 'Segera melakukan pembayaran Tagihan di bulan ini, Agar tidak melebihi hari jatuh tempo <br>Ini adalah notifikasi remainder 7 hari sebelum jatuh tempo',
                                            style: '00bd3f',
                                            tgl : tglJth,
                                            tagihan: tgh
                                        }
                                        ubahStatus(id, 'Belum Bayar');
                                        sendEmail(message);
                                    }
                                } else {
                                    //jika selisih < 0, bulan lalu di kurang selisih 
                                    if(cday == (daysInMonth(cmonth, cyear) - Math.abs(selisih))){
                                        message = {
                                            subject: `Remainder ${data.jenis_remainder} ${data.nama_remainder}`,
                                            message: 'Segera melakukan pembayaran Tagihan di bulan ini, Agar tidak melebihi hari jatuh tempo <br>Ini adalah notifikasi remainder 7 hari sebelum jatuh tempo',
                                            style: '00bd3f',
                                            tgl : tglJth,
                                            tagihan: tgh
                                        }
                                        ubahStatus(id, 'Belum Bayar');
                                        sendEmail(message);
                                    }
                                }
                            }
                        }
                
                    } else {
                
                        if(jthDay >= 28 && cmonth == 2){
                            //jika tagihan sama dengan atau lebih dari tgl 28 bulan februari
                            if(cday == 28 - 7){
                                message = {
                                    subject: `Remainder ${data.jenis_remainder} ${data.nama_remainder}`,
                                    message: 'Segera melakukan pembayaran Tagihan di bulan ini, Agar tidak melebihi hari jatuh tempo <br>Ini adalah notifikasi remainder 7 hari sebelum jatuh tempo',
                                    style: '00bd3f',
                                    tgl : tglJth,
                                    tagihan: tgh
                                }
                                ubahStatus(id, 'Belum Bayar');
                                sendEmail(message);
                            }
                        } else {
                            if(jthDay > 7){
                                //jika bulannya sama jatuh tempo lebih dari tanggal 7
                                if (cday == jthDay - 7){
                                    message = {
                                        subject: `Remainder ${data.jenis_remainder} ${data.nama_remainder}`,
                                        message: 'Segera melakukan pembayaran Tagihan di bulan ini, Agar tidak melebihi hari jatuh tempo <br>Ini adalah notifikasi remainder 7 hari sebelum jatuh tempo',
                                        style: '00bd3f',
                                        tgl : tglJth,
                                        tagihan: tgh
                                    }
                                    ubahStatus(id, 'Belum Bayar');
                                    sendEmail(message);
                                };
                            }
                        }
                
                        if(cday == jthDay){
                            //jika hari ini sama dengan hari jatuh tempo
                            message = {
                                subject: `Remainder ${data.jenis_remainder} ${data.nama_remainder}`,
                                message: 'Segera bayar tagihan bulan ini, Hari ini adalah hari jatuh Tempo',
                                style: 'ff2424',
                                tgl : tglJth,
                                tagihan: tgh
                            }
                            ubahStatus(id, 'Jatuh Tempo');
                            sendEmail(message);
                        } else if(cday > jthDay){
                            //jika hari ini lebih dari hari jatuh tempo
                            message = {
                                subject: `Remainder ${data.jenis_remainder} ${data.nama_remainder}`,
                                message: `Segera bayar tagihan pada tanggal ${tglJth}, Sudah melebihi hari jatuh tempo`,
                                style: 'ff2424',
                                tgl: tglJth
                            }      
                            ubahStatus(id, 'Telat Bayar');
                            sendEmail(message);
                        }
                    }
                }
            });
        })
        
    })
};

module.exports = {
    cekTanggal,
}   