# Steps for configuring Raspberry Pi 3 model B as a server

## Decide what OS you want to use

#### Can a Raspberry Pi 3 run a 64-bit OS, or is it limited to 32-bit?
Answer: "The Pi3 does indeed have 64-bit ARMv8 cores but Broadcom never released the firmware (blobs) or binaries required for running a 64-bit Linux distro. The Raspberry foundation does NOT support or provide a 64-bit variant of Raspbian for that reason. There are several 64-bit Linux distro (Fedora, Arch, SUSE) images for the Pi 3 but a lot of stuff remains broken, unfixed, buggy or poorly implemented. This includes the GPU driver which does not work in aarch64 mode, hardware acceleration and issues like erratic WiFi and USB performance. If you want a fully usable Pi3, you’re gonna have to stick with the 32-bit ARMv7 distros." [source](https://www.quora.com/Can-a-Raspberry-Pi-3-run-a-64-bit-OS-or-is-it-limited-to-32-bit)

#### Choosen OS:   [Ubuntu Server 18.04.4 for Raspberry Pi(32 bit)](https://ubuntu.com/download/raspberry-pi)
#### [Installation instructions](https://ubuntu.com/download/raspberry-pi/thank-you?version=18.04.4&architecture=armhf+raspi3)

## Decide what database you want to use

#### Choosen database: MongoDB (because I want to learn more about it)

#### Is MongoDB free for commercial use?
Answer: [Yes, in the context of this application](https://stackoverflow.com/questions/57432037/mongodb-for-commercial-use)

#### [Installation instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
Also have a look at: https://websiteforstudents.com/install-mongodb-on-ubuntu-18-04-lts-beta-server/


# Configuring the development environment on Windows 10
### How to install MongoDb on Windows 10
#### [Installation instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

### How to install the MongoDB driver on Windows 10

#### Install MongoDB driver for PHP 
I ran into some issue when trying to install the mongodb-odm-bundle for Symfony because this driver was missing.

- Download the aproppriate php [MongoDB driver](https://pecl.php.net/package/mongodb/1.7.4/windows) for PHP(ex: 7.3 Thread Safe (TS) x64 for php 7.3)
- Unzip the archive and put php_mongo.dll in your PHP extension directory ("ext" by default).
- If you are using XAMPP it will be located at "C:\xampp\php\ext"
- Add the following line to your php.ini file (ex: C:\xampp\php\php.ini): extension=mongodb
- Some links that might help in case something goes wrong:
    - [mongo installation manual php](https://www.php.net/manual/ro/mongo.installation.php)
    - [unable to load dynamic library php mongo](https://stackoverflow.com/questions/25075616/php-startup-unable-to-load-dynamic-library-php-mongo-dll)

#### Install MongoDb driver for Node.js
Given that you have created your own project using `npm init` we install the mongodb driver and it's dependencies by executing the following `NPM` command.

`npm install mongodb --save`

This will download the MongoDB driver and add a dependency entry in your `package.json` file.

# The app will be developed using the MERN Stack.
Initially I wanted to develop the app using Symfony, but for me it seems a complicated and maybe there are too many setting to be done.
So, because I am familiar with React.js and Node.js I decided that it will be easier for me to work with these technologies.
[Learn the MERN Stack - Full Tutorial (MongoDB, Express, React, Node.js)](https://www.youtube.com/watch?v=7CqJlxBYj-M&t=5102s)


## Login and Sign up

#### What is the difference between Authentication and Authorization?
Authorization is NOT authentication.
Authentication is taking an username and a password and verify that they are correct.
Authorization is making sure that the user that send requests to the server is the same user that logged in during the authentication process.
A good explanation: [What Is JWT and Why Should You Use JWT](https://www.youtube.com/watch?v=7Q17ubqLfaM)

### Authentication and authorization
[Authentication (Password login in Node.js)](https://www.youtube.com/watch?v=mbsmsi7l3r4)
[Authorization (Using JWT(Json Web Token) in Node.js)](https://www.youtube.com/watch?v=Ud5xKCYQTjM)
When using jwt all the information is in the token so we can use it accross multiple servers, the serves have to share the same secret_token.


