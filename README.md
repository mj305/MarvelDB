# Marvel API  -  Database

-This is the Marvel App Data Base to store all the fan's info that subscribe.


## Technologies used
- React
- Express Server
- Mongo DB
- ngrok
- Material UI 
- CSS Grid


## The Marvel Developer API
- The API Website: https://developer.marvel.com/
- Sign up with your email.
- Get your Public API Key.
- Add ngrok's white listed URL as an Authorized Referer. 


## Setup To Start React App
- create-react-app
- npx create-react-app my-app
- cd my-app
- npm start
- Open http://localhost:3000 to view in the browser.


## Setup To Start Express Server
- npm install express --save
- npx express-generator
- npm install -g express-generator
- express
- cd my-app
- npm install


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

