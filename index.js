const cron = require("node-cron");
const readline = require("readline");
const fs = require("fs");
const moment = require("moment");
const crypto = require("crypto-js");
let nodemailer = require("nodemailer");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

 // create mail transporter
 let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "",
      pass: ""
    }
  });

const password =
  "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";
let enteredPassword = null;

const scheduledAlarm = moment().add(10, "seconds");

let task = cron.schedule("* * * * * *", function () {
  if (crypto.SHA256(enteredPassword).toString() === password) {
    console.log("Password correct - alarm stopped");
    task.stop();
  }

  if (moment().isAfter(scheduledAlarm) && enteredPassword !== password) {
    console.error("ALARM");
    sendMail();
    task.stop();
  }
});

rl.question(`Enter password to stop: `, (answer) => {
  enteredPassword = answer;
  rl.close();
});


function sendMail() {
    let mailOptions = {
        from: "",
        to: "",
        subject: `Alarm - Im in danger!`,
        text: `Hi there, this email was automatically sent by us`
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          throw error;
        } else {
          console.log("Email successfully sent!");
          task.stop();
          transporter.close();
        }
      });
}