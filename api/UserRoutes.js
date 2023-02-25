import express from 'express';
import jwt from 'jsonwebtoken';
import knex from 'knex';
import bcrypt from 'bcrypt'

const db = knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'stackoverclone'
  }
});

const secret = 'secret123';

const UserRoutes = express.Router();

UserRoutes.get('/profile', (req, res) => {
    const token = req.cookies.token;
    jwt.verify(token,secret,(err,data) => {
      if (err) {
        res.status(403).send();
      }else{
        res.json(data).send();
      }
    });
  });

  UserRoutes.post('/login', (req, res) => {
    const {email,password} = req.body;

    db.select('password')
      .where({username:email})
      .from('users')
      .first()
      .then(user => {        
        const isLoginOk = bcrypt.compareSync(password,user.password);
        isLoginOk && jwt.sign(email, secret, (err,token) => {
          if (err) {
              res.status(403).send();
          }else{
            res.cookie('token', token).send('ok');
          }
        });
        
          if (!isLoginOk) {
            res.status(403).send('username or password mismatch');
          }
      })
      .catch(err => {
        res.status(422).send('something went wrong. Sorry')
        console.log(err);
      });
  });

  UserRoutes.post('/register', (req, res) => {
    const {email,password} = req.body;
    db.select('*')
      .from('users')
      .where({'username': email})
        .then(rows => {
          if (rows.length === 0) {
            const hashedPassword = bcrypt.hashSync(password,10);
            db('users').insert({email,password:hashedPassword})
              .then(() =>{
                res.status(201).send('User created');
              })
              .catch(err => res.status(422).send(err));
          }else{
            res.status(422).send('Email already exist in database');
          }
        })
        .catch(err => res.status(422).send(err));
  });

  UserRoutes.post('/logout', (req, res) => {
    res.clearCookie('token').sendStatus(200);
  });
  

export default UserRoutes;