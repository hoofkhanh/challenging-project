const {PhoneNumber} = require('../config');

var https = require('follow-redirects').https;
var fs = require('fs');

const initRequest = () =>{
    const options = {
        'method': 'POST',
        'hostname': '3g9qwn.api.infobip.com',
        'path': '/sms/2/text/advanced',
        'headers': {
            'Authorization': 'App f797e4ae6a2edc5a4102a6aa25e7b43c-0f9c8ebd-069b-4c90-bb70-41cea72ad98a',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        'maxRedirects': 20
      };
      
      const req = https.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
      
        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });
      
        res.on("error", function (error) {
            console.error(error);
        });
      });

      return req;
}

const createNewAccessCode = async (phoneNumber) => {
    const newAccessCode = Math.floor(100000 + Math.random() * 900000) + '';
    const newPhoneNumber = {phoneNumber: phoneNumber, accessCode:  newAccessCode};

    await PhoneNumber.where('phoneNumber', '==', phoneNumber).get()
    .then(async (querySnapshot) => {
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());

                const docRef = PhoneNumber.doc(doc.id);
                docRef.update({
                    accessCode: newAccessCode
                })

            });
        } else{
            await PhoneNumber.add(newPhoneNumber);
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    
    phoneNumber = '+84' + phoneNumber.slice(1);

    const req = initRequest();
    const postData = JSON.stringify({
        "messages": [
            {
                "destinations": [{"to": + phoneNumber}],
                "from": "ServiceSMS",
                "text": newAccessCode
            }
        ]
    });

    req.write(postData);
    req.end();

    return newAccessCode;
}

const validateAccessCode = async (phoneNumber, accessCode) =>{
    const querySnapshot = await PhoneNumber.where('phoneNumber', '==', phoneNumber).get()

    let phoneNumberId = "";

    if(!querySnapshot.empty){
        let success = false;
        await querySnapshot.forEach(async (doc) => {
            const accessCodeFromDatabase = await doc.data().accessCode;
            
            if(accessCode == accessCodeFromDatabase){
                phoneNumberId = doc.id;
                success = true;
            }
        
        });

        if(success == false){
            return {success: false };
        }else{
            const docRef = await PhoneNumber.doc(phoneNumberId);
            await docRef.update({
                accessCode: ''
            });

            return {success: true };
        }
        
    }else{
        return {success: false};
    }
}


module.exports = {
    createNewAccessCode,
    validateAccessCode,
}

