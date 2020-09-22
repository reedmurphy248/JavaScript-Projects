function sendEmail() {
	Email.send({
	Host: "smtp.gmail.com",
	Username : "reedmurphy248@gmail.com",
	Password : "Murphyr1996",
    To : 'leo.kone@gmail.com',
	From : "reedmurphy248@gmail.com",
	Subject : "Step 1 Complete Bitchass",
	Body : "Leo has sex with beat women",
    // Attachments : [
    //     {
    //         name : "smtpjs.png",
    //         path:"https://networkprogramming.files.wordpress.com/2017/11/smtpjs.png"
    //     }]
    }).then(
        message => alert("mail sent successfully")
    );
}