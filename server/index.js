const { createClient } =  require('@supabase/supabase-js')
const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');

dotenv.config();
const bcryptSalt = bcrypt.genSaltSync(10);
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
// Conection with data base
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const app = express();
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(cookieParser());


app.get('/profile', async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({error: 'Not authorized'});
  } else {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.status(401).json({error: 'Not authorized'});
      } else {
          res.status(200).json(decoded);
      }
    });
  }
})

app.post('/login', async (req, res) => {
  const {username, password} = req.body;
  const {data, error} = await supabase.from('Users').select().eq('Username', username);
  if (error) {
    res.status(400).json({error: 'Error getting user'});
  } else if (data.length === 0) {
    res.status(400).json({error: 'User not found'});
  } else if (!bcrypt.compareSync(password, data[0].password)) {
    res.status(400).json({error: 'Invalid password'});
  } else {
    jwt.sign({userId: data[0].id, username}, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
      if (err) {
        res.status(400).json({error: 'Error generating token'});
      } else {
        res.cookie('token', token,{sameSite: 'none',secure:true}).status('200').json({
          id: data[0].id,
          username
        });
      }
    });
  }
})
app.post('/register',async (req, res) => {
 const {username, password} = req.body;
 const check = await supabase.from('Users').select().eq('Username', username);
  if (check.data.length > 0) {
    res.status(400).json({error: 'Username already exists'});
    return;
  }
  else {
  const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
 const {data, error} = await supabase.from('Users').insert([{
   Username: username, 
   password: hashedPassword }]).select();
  if (error) {
    console.log(error);
    res.status(400).json({error: 'Error inserting user'});
  } else {
    jwt.sign({userId: data[0].id, username}, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
      if (err) {
        res.status(400).json({error: 'Error generating token'});
        console.log()
      } else {
        res.cookie('token', token,{sameSite:'none',secure:true}).status('201').json({
          id: data[0].id,
          username
        });
      }
    });
  }
  }
});

// A route for check if the username is used
app.post('/checkUser', async (req, res) => {
const {username} = req.body;
  console.log(username);
  const {data, error} = await supabase.from('Users').select().eq('Username', username);
  console.log(data);
  if (error) {
    res.status(400).json({error: 'Error getting user'});
  } else if (data.length === 1) {
    res.status(200).json({isUsed: true});
  } else {
    res.status(200).json({isUsed: false});
  }
});
  
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
