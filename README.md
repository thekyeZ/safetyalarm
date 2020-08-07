# SafetyAlarm

Whenever you are going to do something dangerous turn this script on with

`node .`

It will stay on and until you enter password. If
you don't do it in previusly set time it will notify your friends and family that you might be in danger

Berfore running:

    - choose password and hash it with SHA256
    - pase hash as value of `password` variable
    - select time in `scheduledAlarm` variable by adding time to present
    - set your email credetials
    - set mail reciepets in `mailOptions`

You are ready to go!

`node .`

Note, that it's still in development


## TODO:
    [ ] Move mail credentials to separate files
    [ ] Add SMS gateway
    [ ] Connect with facebook API (maybe)