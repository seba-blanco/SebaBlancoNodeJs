const NM = require('nodemailer');
const { MAILADMIN, MAILFROM, MAIL_USER, MAIL_PASS } = require('../config/global')
const {logger} = require('../utils/logger4');


const transporter = NM.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
    }
});

sendMail  = async (subject, emailTO, mailBody ) => {
    try {
        const mailOptions = {
            from: MAILFROM,
            to: emailTO,
            subject: subject,
            html: mailBody
        };

        const info = await transporter.sendMail(mailOptions);
        
    }
    catch(err) {
        logger.error(err);
    }
}
sendNewOperationMail = async (order) => {
    
    let subject=`nuevo pedido de: ${order.user}`;
        
    let data = order.prods.map((elem, index) => {
        return (`<p><b>producto: ${elem.name}</b></p>
                 <p><b>precio: ${elem.price}</b></p>
                 <p><b>cantidad: ${elem.stock}</b></p>`)
    });

    await sendMail(subject, order.userEmail, data.toString());
 
}
sendNewUserMail =async (newUser) => {
    let HTML = `Se registro un nuevo usuario: 
    <p><b>Username: ${newUser.username}</b></p> 
    <p><b>First Name: ${newUser.firstName} </b></p> 
    <p><b>Last Name: ${newUser.lastName} </b></p>
    <p><b>address: ${newUser.address}</b></p>
    <p><b>age: ${newUser.age} </b></p>
    <p><b>cellphone: ${newUser.cellphone} </b></p>
    <p><b>email: ${newUser.email}<</b></p>`;


    await sendMail('Nuevo Registro', MAILADMIN, HTML);
 
}

module.exports = {sendNewUserMail, sendNewOperationMail}