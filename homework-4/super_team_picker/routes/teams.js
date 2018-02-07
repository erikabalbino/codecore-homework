var express = require('express');
const knex = require('../db');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {

  res.render('teams/index');

});

router.post('/', (req, res) => {
  const logoUrl = req.body.logoUrl;
  const name = req.body.name;
  const members = req.body.members;

  knex
    .insert({
      logoUrl: logoUrl,
      name: name,
      members: members,
    })
    .into('cohorts')
    .then(() => {
      res.redirect('/teams');
    });
});

router.get('/show', (req, res) => {
  knex
    .select()
    .from('cohorts')
    .then(cohorts => {
      console.log(cohorts);
      res.render('teams/show', {cohorts: cohorts});
    });
});

module.exports = router;
