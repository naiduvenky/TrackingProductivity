# TrackingProductivity
This web application is designed to monitor the daily productivity of users. It employs a calendar where the maximum productivity of a person is set at 6 hours a day. The application calculates and evaluates productivity against this 6-hour (360-minute) benchmark.
# How to Download and Set Up This App on Your Machine
## Prerequisites
1. node.js
2. git
3. vs code
## Backend
1. clone the repository using the command
   ```shell
   git clone https://github.com/naiduvenky/TrackingProductivity.git
2. change the directory to trackingProductivity  using the command
   ```shell
   cd TrackingProductivity
3. open the vs code using this command
   ```shell
    code .
4. change the directory to the backend  using the command, choose terminal as git bash
   ```shell
    cd backend
5. setup the database
   - download the MySQL database and note done username and password
   - using the UI tool of database create a database and note down its name
   - now configure the above details in config.json as shown below <img width="566" alt="image" src="https://github.com/naiduvenky/TrackingProductivity/assets/142713713/ba502471-c6cc-4c23-811d-1acf943bbbbc">


6. Install the Sequelize Command Line Interface (CLI) globally on your system
   ```shell
      npm install sequelize-cli -g

7. Run the sh file in the git bash using the commend
   ```shell
      sh dev.sh

## Frontend
1. take new instance of the terminal
2. change the directory to the frontend  using the command
   ```shell
    cd frontend
3. install required packages using the command
   ```shell
    npm i
4. Finally run the command
   ```shell
    npm run start

#### Tech Stack Used:
1. Node.js(18.12.1) 
2. MySQL(8.1.0)
3. Sequelize ORM
4. React.js with Redux-toolkit
5. Material UI
   
