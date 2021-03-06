const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const hbs = exphbs.create({ helpers });

const session_table = new SequelizeStore({
  db: sequelize
});

session_table.sync();

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 360000,
     httpOnly: true,
     secure: false,
     sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: session_table
};

app.use(session(sess));

// app.use(function (req, res, next) {
//   res.locals.session = req.session;
//   next();
// });


// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
