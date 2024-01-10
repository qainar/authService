import * as nodemailer from "nodemailer";
import { Injectable } from '@nestjs/common';


@Injectable()
export class MailService {
    private transporter
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            logger: true,
            secure: true,
            auth:{
                user: 'qainar2002qkr@gmail.com',
                pass: 'awci nath lsrg xizi'
            },
            // tls: {
            //     rejectUnAuthorized: true
            // }
        } as nodemailer.TransportOptions)
    }

    async sendCodeToMail(to: string, code: string){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: 'Registration to E-book ',
            text: '...',
            html:
                `
                    <div>
                        <h1>Code for registration account ${code}. Good Luck 😘</h1>
                    </div>
                `
        })
    }
}