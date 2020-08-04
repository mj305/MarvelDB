# Marvel API  -  Database

-This is the Marvel App Data Base to store all the fan's info that subscribe.


## Technologies used
- Nodejs
- Express
- Mongo DB


## Setup To Start Express Server
- npm install
- npm run dev


## Setup To Start MongoDB

### For Mac:
- brew update
- brew tap mongodb/brew
- brew install mongodb-community
- brew services start mongodb-community

### For Mac:
- sudo apt update
- sudo apt install -y mongodb
- sudo systemctl enable mongodb


## Deployment
- heroku create
- git push heroku master
- heroku run rake db:migrate
- Heroku open

