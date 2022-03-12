const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: 'infinite010750@gmail.com',
    pass: 'likthyzsuxqlthqg',
  },
});

transporter.sendMail({
  from: 'infinite010750@gmail.com',
  to: 'fqc39051@mzico.com',
  subject: '輸入信件主旨',
  html: '輸入信件內容',
}).then(info => {
  console.log({ info });
}).catch(console.error);