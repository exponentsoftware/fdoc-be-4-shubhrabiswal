const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv')
const bodyParser = require('body-parser')
const session = require('express-session');
const app = express()
env.config();
const PORT = process.env.PORT||5000

require('./config/passport');
const todoRoute = require('./router/todorouter')
const userRoute = require('./router/userrouter')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ 
  secret: 'passport-tutorial', 
  cookie: { maxAge: 60000 }, 
  resave: false, 
  saveUninitialized: false 
}));


app.use('/api/todo', todoRoute)
app.use('/api/user', userRoute)

app.get('/',function(req,res){
    res.send("working")
})
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to database'))
  .catch(() => console.log('Failed to connect to database.'));



app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})

