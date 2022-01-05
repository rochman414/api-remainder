require('dotenv').config();
const cron = require('node-cron');
const nodemailer = require('nodemailer');

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

    var mailOption = {
        from: process.env.EMAIL,
        to: process.env.EMAIL_TO,
        subject: message.subject,
        text: 'test email tester!',
        html: `<!doctype html>
                <html>
                <head>
                </head>
                <body>
                        <div style='text-align:center'>
                        <h3>${message.subject}</h3>
                        <h3 style='color:#ff2424'>${message.message1}</h3>
                        <h3>${message.tgl}</h3>
                        <p>Terimakasih</p>
                        </div>
                </body>
                </html>`
    }

    transporter.sendMail( mailOption, (err,info) => {
        if(err) throw err;
        console.log(info.response);
    })  
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

var tglJth = "01-02-2022";

var jth = tglJth.split('-');
var jthDay = jth[0];
var jthMonth = jth[1];
var jthYear = jth[2];

var curentDate = new Date(Date.now());
var cday = String(curentDate.getDate()+20).padStart(2, '0');
var cmonth = String(curentDate.getMonth()+1).padStart(2, '0');
var cyear = curentDate.getFullYear();

var message;
var selisih = jthDay - 7;

if(cyear != jthYear){

    if(cyear - jthYear > 0){
        //Telat Bayar
        console.log('Sudah melebihi jatuh tempo segera bayar')
    } else {
        //Belum bayar
        if(jthDay < 8){
            //jika tgl jatuh tempo kurang dari tgl 8
            if(selisih == 0){
                //jika selisih = 0 maka kirim di akhir bulan sebelumnya
                if(cday == daysInMonth(12, cyear)){
                    console.log('kirim email selisih = 0')
                }
            } else {
                //jika selisih < 0, bulan lalu di kurang selisih 
                if(cday == (daysInMonth(12, cyear) - Math.abs(selisih))){
                    console.log('kirim email selisih < 0')
                }
            }
            console.log('kurang dari 8')
        }
        console.log('Belum bayar')
    }

} else {

    if(cmonth != jthMonth){

        if(cmonth - jthMonth > 0){
            //Telat Bayar
            console.log('Sudah melebihi jatuh tempo segera bayar')
        } else {
            //Belum bayar
            if(jthDay < 8){
                //jika tgl jatuh tempo kurang dari tgl 8
                if(selisih == 0){
                    //jika selisih = 0 maka kirim di akhir bulan sebelumnya
                    if(cday == daysInMonth(cmonth, cyear)){
                        console.log('kirim email selisih = 0 bulan yang berbeda')
                    }
                } else {
                    //jika selisih < 0, bulan lalu di kurang selisih 
                    if(cday == (daysInMonth(cmonth, cyear) - Math.abs(selisih))){
                        console.log('kirim email selisih < 0 bulan yang berbeda')
                    }
                }
                console.log('kurang dari 8')
            }
            console.log('Belum bayar')
        }

    } else {

        if(jthDay >= 28 && cmonth == 2){
            //jika tagihan sama dengan atau lebih dari tgl 28 bulan februari
            if(cday == 28 - 7){
                console.log('kirim email bulan februari')
            }
        } else {
            if(jthDay > 7){
                //jika bulannya sama jatuh tempo lebih dari tanggal 7
                if (cday == jthDay - 7){
                    console.log('kirim email 7 hari sebelum jatuh tempo')
                };
            }
        }

        if(cday == jthDay){
            //jika hari ini sama dengan hari jatuh tempo
            message = {
                subject: 'Tester email remainder',
                message1: 'Segera bayar tagihan bulan ini, Hari ini hari jatuh Tempo',
                tgl: `${jthDay}-${jthMonth}-${jthYear}`
            }
            console.log('Segera bayar tagihan hari ini hari jatuh tempo')
        } else if(cday > jthDay){
            //jika hari ini lebih dari hari jatuh tempo
            console.log('Sudah melebihi jatuh tempo')            
        }
        sendEmail(message);
    }
}













// function cekTanggal() {  
//     cron.schedule('1 * * * * *', function () { 
//         var tglJth = "07-01-2022";

//         var jth = tglJth.split('-');
//         var jthDay = jth[0];
//         var jthMonth = jth[1];
//         var jthYear = jth[2];
        
//         var curentDate = new Date(Date.now());
//         var cday = String(curentDate.getDate()).padStart(2, '0');
//         var cmonth = String(curentDate.getMonth() + 1).padStart(2, '0');
//         var cyear = curentDate.getFullYear();

//         console.log(`${jthDay}-${jthMonth}-${jthYear}`);
//     })
// };

// cekTanggal();

// module.exports = {
//     cekTanggal,
// }   