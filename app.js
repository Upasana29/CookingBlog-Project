//const { application } = require('express');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 5555;
require('dotenv').config();

app.use(express.urlencoded( { extended: true} ));
app.use(express.static('public')); //when you need to use any image or other file don't need to give full path
app.use(expressLayouts);

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());


app.set('layout','./layouts/main');//this is we gone store layout
app.set('view engine','ejs');

const routes = require('./server/routes/recipeRoutes.js')
app.use('/',routes);

app.listen(port,() => console.log(`listening to port ${port}`));
