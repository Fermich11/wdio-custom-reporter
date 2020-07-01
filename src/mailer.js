import { error } from 'winston';

const nodemailer = require('nodemailer');
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
            html: '<b>Hello world?</b>', // html body
        };
    }

    sendMail() {
        return this.transporter.sendMail(this.mailOptions).catch(e => e);
    }
}