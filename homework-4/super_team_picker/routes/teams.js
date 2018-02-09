var express = require('express');
const knex = require('../db');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {

  res.render('teams/new');

});

router.post('/', (req, res) => {
  if (req.body.logUrl || req.body.name || req.body.members) {
    const logoUrl = req.body.logoUrl;
    const name = req.body.name;
    const members = req.body.members;

    knex
      .insert({
        logoUrl: logoUrl,
        name: name,
        members: members,
      })
      .returning('id')
      .into('cohorts')
      .then((id) => {
        //res.redirect('/teams/index');
        res.redirect(`/teams/${id}`);
      });
  } else {
    res.render('teams/new');
  }
});

// router.post('/:id', (req, res) => {
//   const id = req.params.id;
//   res.redirect(`/teams/${id}`);
//
// });

router.get('/index', (req, res) => {
  // if (req.body.logUrl || req.body.name || req.body.members) {
  // } else {
  //   res.render('teams/index');
  // }
  knex
  .select()
  .from('cohorts')
  .then(cohorts => {
    console.log(cohorts);
    res.render('teams/index', { cohorts: cohorts });
  });

});

router.get('/:id', (req, res) => {
  // Paths that have `:` in their name will ne stored as a key value
  // in req.params. Use it to the `id` of a post.
  console.log(req.params);
  const teamId = req.params.id;

  if (isNaN(parseInt(teamId, 10))) {
    return res.redirect('/');
  }

  knex
      // .select()
      .first() // replace select with first when you only want one row
      .from('cohorts')
      .where({id: teamId})
      .then(cohorts => {
        res.render('teams/show', {cohorts: cohorts || {}});
        // res.send(cohorts); --> so para testar
      })

    // res.send(req.params) --> so para testar
});

module.exports = router;
