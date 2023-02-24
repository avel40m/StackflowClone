import express from "express";
import jwt from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();
const port = 3030;
const secret = 'secret123';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.get('/', (req, res) => {
    res.send('test');
});

app.get('/profile', (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token,secret,(err,data) => {
    if (err) {
      res.status(403).send();
    }else{
      res.json(data).send();
    }
  });
})

app.post('/login', (req, res) => {
  const {email,password} = req.body;
  const isLoginOk = email === 'test@example.com' && password === 'test';
  
  isLoginOk && jwt.sign(email, secret, (err,token) => {
    if (err) {
        res.status(403).send();
    }else{
      res.cookie('token', token).send();
    }
  });

  if (!isLoginOk) {
    res.status(403).send('login not ok');
  }
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});