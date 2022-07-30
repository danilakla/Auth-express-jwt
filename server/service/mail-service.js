const nodemailer = require('nodemailer')

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      post: 587,
      secure: false,
      requireTLS: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL
      }
    })
  }

  async sendActivationOnEmail(to, link) {
    await this.transporter.sendMail({
      from: process.env.USER_EMAIL,
      to,
      subject: 'Activation link ' + process.env.API_URL,
      text: 'test',
      html:

        `       <div>
        
          <a href="${link}">${link}</a>
        </div>`
    }, (err) => {
      if (err) {
        console.log(err);
      }
    }, (e) => console.log(e))


  }
}

module.exports = new MailService()