# Steps for configuring Raspberry Pi 3 model B as a server

## Decide what OS you want to use

#### Can a Raspberry Pi 3 run a 64-bit OS, or is it limited to 32-bit?
Answer: "The Pi3 does indeed have 64-bit ARMv8 cores but Broadcom never released the firmware (blobs) or binaries required for running a 64-bit Linux distro. The Raspberry foundation does NOT support or provide a 64-bit variant of Raspbian for that reason. There are several 64-bit Linux distro (Fedora, Arch, SUSE) images for the Pi 3 but a lot of stuff remains broken, unfixed, buggy or poorly implemented. This includes the GPU driver which does not work in aarch64 mode, hardware acceleration and issues like erratic WiFi and USB performance. If you want a fully usable Pi3, you’re gonna have to stick with the 32-bit ARMv7 distros." [source](https://www.quora.com/Can-a-Raspberry-Pi-3-run-a-64-bit-OS-or-is-it-limited-to-32-bit)

#### Choosen OS:   [Ubuntu Server 18.04.4 for Raspberry Pi(32 bit)](https://ubuntu.com/download/raspberry-pi)
#### [Installation instructions](https://ubuntu.com/download/raspberry-pi/thank-you?version=18.04.4&architecture=armhf+raspi3)

#### [Enable SSH on Ubuntu 18.04](https://linuxize.com/post/how-to-enable-ssh-on-ubuntu-18-04/?fbclid=IwAR1E0IUDXDpt5xEw5wA-yeTGWaYLyXHXRKu_WFem9PoS9pJZH7gMlObWIas)

#### Environment setup ([source](https://medium.com/hackernoon/tutorial-creating-and-managing-a-node-js-server-on-aws-part-2-5fbdea95f8a1#.mnlkymeti))
1. SSH into the Raspberry pi
1. Installing NodeJs using PPA ([source](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04))
    - First, install the PPA in order to get access to its contents. From your home directory, use curl to retrieve the installation script for your preferred version, making sure to replace 12.x with your preferred version string (if different):
    `cd ~`
    `curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh`

    - Run the script under sudo:
    `sudo bash nodesource_setup.sh`
    The PPA will be added to your configuration and your local package cache will be updated automatically. 

    - After running the setup script from Nodesource, you can install the Node.js package in the same way you did above:
    `sudo apt install nodejs`

    - To check which version of Node.js you have installed after these initial steps, type:
    `nodejs -v`

    - In order for some npm packages to work (those that require compiling code from source, for example), you will need to install the build-essential package:
    `sudo apt install build-essential`
    You now have the necessary tools to work with npm packages that require compiling code from source.
1. Run the commands to:
`mkdir server`
`mkdir server/scheduler`
1. In the _test_ folder create a file called _index.js_:
`nano server/scheduler/index.js`
1. And add the following code to it:
    ```
    const http = require('http');

    const hostname = 'localhost';
    const port = 3000;

    const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
    });

    server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    });
    ```
1. Create a new server using:
`node server/scheduler/index.js`

1. Open another terminal on your server and connect to localhost using
`curl http://localhost:3000`
You should receive the message "Hello World!".

1. Install nginx.
`sudo apt-get install nginx`
It is not great to run Node.js on port 80 or 443 directly because you may want to open up a few different applications on these ports. Nginx is a router that sends traffic from port 80 or port 443 to any program you wish, depending on the headers of the incoming HTTP requests.

1. Run the comand:
`curl localhost` 
And you should see a bunch of html code representing a welcoming page to nginx.

1. If it doesn't work you might needt to start nginx manually
`sudo /etc/init.d/nginx start`

1. Run:
`cat /etc/nginx/sites-available/default`
And take a look. Nginx configs are stored in plain text files in
`sites-available` with any name. Linking them into the `sites-enabled` folder will cause them to be read and used when nginx starts. All of the configs are combined together by nginx.

1. Remove the default config from sites-enabled:
`sudo rm /etc/nginx/sites-enabled/default`

1. Create a config file in `sites-available` and name it __scheduler__
`sudo nano /etc/nginx/sites-available/scheduler`

1. Add the following configuration to the newly created file:
    ```
    server {
        listen 80;
        server_name scheduler;
        location / {
            proxy_set_header  X-Real-IP  $remote_addr;
            proxy_set_header  Host       $http_host;
            proxy_pass        http://127.0.0.1:3000;
        }
    }
    ```
    This will forward all HTTP traffic from port 80 to port 3000.

1. Link the config file in `sites enabled` (this will make it seem like the file is actually copied in `sites-enabled`).
`sudo ln -s /etc/nginx/sites-available/scheduler /etc/nginx/sites-enabled/scheduler`

1. Restart __nginx__ for the new config to take effect.
`sudo service nginx restart`

1. Stop all your running node procceses
`killall -9 node` 

#### Keeping the processes running using an NPM package called PM2.

1. Install PM2 globally
`sudo npm i -g pm2`

1. Start your server using pm2 to execute index.js:
`sudo pm2 start server/scheduler/index.js`

1. To make sure that your PM2 restarts when your server restarts
`sudo pm2 startup`
This will print out a line of code you need to run depending on the server you are using. Run the code it outputs.

1. Save the current running processes so they are run when PM2 restarts.
`sudo pm2 save`
Now you can log out/in to SSH, even restart your server and it will continue to run on port 80.

##### Naming processes
1. List all processes:
`sudo pm2 ls`
1. Use the number listed in pm2 ls to stop daemon
`sudo pm2 stop index`
1. Remove it from the list
`sudo pm2 delete index`
1. Start it again with a nicer name
`sudo pm2 start server/scheduler/index.js --name "scheduler"`
1. Run:
`sudo pm2 save`
[PM2 docs](http://pm2.keymetrics.io/)


#### Going public

For some reason I don't think it is possible to go public from DIGI rcs&rds networks, I played around with port forwarding but had no luck in accessing my website using the public IP and port number. I think that it is a good decision to give up on the raspberry pi here. Maybe it is a good idea to explore some hosting services..


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

###


## Generating PEM file for your Linux server ([source](https://therandombits.com/2016/01/create-pem-file-for-your-linux-server/))

__Note__: I ran this commands on windows using git bash because some tools are not awailable under windows. (For example: _ssh-copy-id_, _chmod_)

__Objective__: To disable password based logins and login only using key based authentication. Will create a pem file which will be used to access the server.

__Steps:__
1. Go to the directory on your local machine where you want to create the keys
`cd ../keys/`

1. Create public and private keys using the next command. Enter a name when asked, I skipped the passphrase.
`ssh-keygen -t rsa -b 2048`

1. Keep the private key as it is and create a new pem file from it:
`openssl rsa -in keyname -outform pem > keyname.pem` 
For this step make sure open ssl is installed and it is available in your windows environment variables.
Otherwise you will get a warning: _Can't open config file: /usr/local/ssl/openssl.cnf_
Openssl can be download from [here](https://slproweb.com/products/Win32OpenSSL.html).

1. Copy the public key to your remote server using the command(change the ip to your server ip):
`ssh-copy-id -i keyname.pub root@185.244.130.86`

1. Change the permissions of the pem file:
`chmod 400 keyname.pem`

1. Now login to the server with your pem file:
`ssh -i keyname.pem root@185.244.130.86`
Keep this terminal tab open. In case something goes wrong, to revert back to older edits. If you were able to login to your server, that means all good so far. Now let’s disable the password based logins.

1. Disable PasswordAuthentication in sshd_config:
`nano /etc/ssh/sshd_config` 
Press _Ctrl+W_ to open a search window; type in _PasswordAuthentication_ and press _Enter_. Remove the "#" sign at the start of the PasswordAuthentication label, then replace "Yes" with "No" so that the line reads: _PasswordAuthentication no_
Press _Ctrl+W_ to open a search window; type in _PermitRootLogin_ and press _Enter_. Remove the "#" sign at the start of the PermitRootLogin label, then replace "Yes" with "without-password" so that the line reads: _PermitRootLogin without-password_
Run: `sudo service ssh restart`
Now open new terminal/konsole tab and try to login with password as you were doing it before. If you get the following error then it means you successfully disabled the password based logins.
`Permission denied (publickey,gssapi-keyex,gssapi-with-mic).`
Useful info: [here](https://www.digitalocean.com/community/questions/root-access-with-ssh-permitrootlogin-or-passwordauthentication)