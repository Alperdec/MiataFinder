require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const twilioPhoneNum = process.env.TWILIO_PHONE_NUM;
const subscriberNum = process.env.TWILIO_SUBSCRIBER_NUM;
const followlink = process.env.CAR_URI;

const buildMessage = (vin, year, locationName) => {
  const greeting = '\nVroom Vroom Bitch!\n';
  const link = `${followlink}/${vin}`;

  return `${greeting}New ${year} MX-5 Miata listed at ${locationName}!\n${link}`;
};

exports.sendMessage = async (car) => {
  client.messages
    .create({
      body: buildMessage(car.vin, car.modelYear, car.locationName),
      from: twilioPhoneNum,
      to: subscriberNum,
    })
    .then(res => res)
    .catch(err => console.error(err));
};
