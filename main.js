require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  console.error("Twilio credentials are missing");
  process.exit(1);
}

const client = require("twilio")(accountSid, authToken);

async function deleteAllMessages() {
  const messages = await client.messages.list();
  for (const message of messages) {
    console.warn(`Would have deleted ${message.sid}`);
    message.remove();
  }
}

deleteAllMessages()
  .then(() => console.log("DONE"))
  .catch((err) => console.error());
