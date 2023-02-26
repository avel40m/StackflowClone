import express from 'express';
import db from './db.js';

const QuestionRoutes = express.Router();

QuestionRoutes.post('/questions', (req,res) => {
    const {title,content} = req.body;
    const {token} = req.cookies;
    db.select('id')
      .from('users')
      .where({token})
      .first()
      .then(user => {
        if(user && user.id){
            db('posts').insert({
                title,
                content,
                parent_id: null,
                author_id: user.id
            })
             .then(() => res.sendStatus(201))
             .catch(() => res.sendStatus(422));            
        }else {
            res.status(403).send(user);
        }
      })
});

QuestionRoutes.get('/questions/:id', (req, res) => {
  const id = req.params.id;
  db.select('*')
    .from('posts')
    .where({id})
    .first()
      .then(question => {
        res.json(question).send();
      })
      .catch(() => res.sendStatus(422));

});

export default QuestionRoutes;