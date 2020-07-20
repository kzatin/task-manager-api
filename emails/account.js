const sgMail = require('@sendgrid/mail')
// const sendgridAPIkey = "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"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:"kzatin@deaninfotech.com",
        subject:"Zatin's Node Creation",
        text:`Hello ${name} your account is succesfully create` 
    })
}

const sendCancelationEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:"kzatin@deaninfotech.com",
        subject:"Zatin's Node Creation",
        text:`Hello ${name} your account is succesfully Deleted` 
    })
}

module.exports={
    sendWelcomeEmail,
    sendCancelationEmail
}


