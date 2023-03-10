import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import db from './db.js';


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
            db('users')
              .where({username:email})
              .update({token})
                .then(() => res.cookie('token', token).send('ok'))
                .catch((e) => res.status(422).send(e));
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
            db('users').insert({username:email,password:hashedPassword})
              .then(() =>{
                jwt.sign(email,secret,(err,token) => {
                  if (err) {
                    res.sendStatus(403);
                  } else {
                    res.cookie('token',token)
                    .status(201)
                    .send('User created');
                  }
                });
              })
              .catch(err => {
                console.log(err);
                res.status(422).send('User creation failed')
              });
          }else{
            res.status(422).send('Email already exist. Please try to login');
          }
        })
        .catch(err => res.status(422).send(err));
  });

  UserRoutes.post('/logout', (req, res) => {
    res.clearCookie('token').sendStatus(200);
  });
  

export default UserRoutes;