import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
   host: "smtp.mailtrap.io",
   port: 2525,
   auth: {
      user: "61b7cb7751c7e6",
      pass: "4a280e9e87e533"
   }
});

export class NodemailerMailAdapter implements MailAdapter {

   async sendMail({ subject, body }: SendMailData) {

      await transport.sendMail({
         from: 'Equipe Feedget <oi@feedget.com>',
         to: 'Ikaro Amorim <ikaro.amorim@gmail.com>',
         subject,
         html: body
      })
   }
}