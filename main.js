require("dotenv").config({ path: "./twilio.env" });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  console.error("Twilio credentials are missing");
  process.exit(1);
}

const client = require("twilio")(accountSid, authToken);

client.messages
  .list({ limit: 20 })
  .then((messages) => {
    messages.forEach((m) => console.log(m.body));
  })
  .catch((err) => console.error(err));
