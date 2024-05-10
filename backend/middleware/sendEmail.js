import nodemailer from 'nodemailer'

const sendMail = async(email, subject, text) => {
    try {
        const transporter =await nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: process.env.EMAIL_PORT,
            secure: process.env.SECURE,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            }
        })

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        })
        
        console.log('email sent')
    } catch (err) {
        console.log(err)
    }
}

export default sendMail