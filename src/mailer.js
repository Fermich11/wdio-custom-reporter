const nodemailer = require('nodemailer');
const QuickChart = require('quickchart-js');
const xoauth2 = require('xoauth2');

export class Mailer {
    constructor(transporter) {
        this.transporter = nodemailer.createTransport(transporter);

            /* 
            this.transporter = nodemailer.createTransport(
                mailOptions
                auth: {
                    xoauth: xoauth2.createXOAuth2Generator({
                        user: '',
                        clientId: '',
                        clientSecret:'',
                        refresh_token: ''
                    })
                }*/

        this.mailOptions = {
            from: 'wdio.mailer@gmail.com', // sender address
            to: 'c-fmichel@jwplayer.com', // list of receivers
            subject: 'You\'re reports', // Subject line
            text: 'Hello, you should check your reports', // plain text body
            html: 'Here goes your features', // html body
        };
    }

    sendMail(features) {
        let pass = 0, fail = 0, total = 0;
        Object.keys(features).forEach((key) => {
            features[key].forEach((scenario) => {
                scenario.status = 'pass' ? pass++ : fail++;
                total++;
            });
        });
         const myChart = new QuickChart();
        myChart
        .setConfig({
            type:'doughnut',
            data: {
                labels: ['Pass','Fail'],
                datasets:[{data:[pass, fail]}]
            },
            options: {
                plugins:{
                    doughnutlabel:{ 
                        labels:[{text:total,font:{size:20}},{text:'total'}]
                    }
                }
            }
        })
        .setWidth(400)
        .setHeight(250)
        .setBackgroundColor('transparent');

        const chartImageUrl = myChart.getUrl();

        this.mailOptions.html = `Here is the latest WebdriverIO run overview:
            <br><br>
            <img src="${chartImageUrl}" />
            `;
        return this.transporter.sendMail(this.mailOptions).catch(e => e);
    }
}