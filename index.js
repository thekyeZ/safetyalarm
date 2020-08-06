const cron = require("node-cron");
const readline = require("readline");
const fs = require("fs");
const moment = require("moment");
const crypto = require("crypto-js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
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
  }
});

rl.question(`Enter password to stop: `, (answer) => {
  enteredPassword = answer;
  rl.close();
});
