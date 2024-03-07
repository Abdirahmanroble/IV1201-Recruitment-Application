// /* eslint-disable @typescript-eslint/explicit-function-return-type */
// import nodemailer from 'nodemailer'
// import { type Request, type Response } from 'express'

// // This is a simple mail sending function using Nodemailer
// async function createConfirmationEmail (
//   to: string,
//   subject: string,
//   text: string
// ) {
//   const testAccount = await nodemailer.createTestAccount()
//   // Create a transporter using SMTP
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass // generated ethereal password
//     },

//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(transporter))
//   })

//   //   console.log('Message sent: %s', info.messageId)
//   //   return info.messageId
// }

// async function sendConfirmationEmail (req: Request, res: Response) {
//   const info = await nodemailer.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: req.body.email, // list of receivers
//     subject: 'Confirmation Email', // Subject line
//     text: 'Hello world?', // plain text body
//     html: '<b>Hello world?</b>' // html body
//   })

//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
// }

// export default sendConfirmationEmail
