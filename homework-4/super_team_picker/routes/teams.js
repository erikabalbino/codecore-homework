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
  // console.log(req.params);
  const teamId = req.params.id;
  const quantity = Number(req.query.quantity);
  const opt = req.query.method;

  if (isNaN(parseInt(teamId, 10))) {
    return res.redirect('/');
  }

  knex
    // .select()
    .first() // replace select with first when you only want one row
    .from('cohorts')
    .where({id: teamId})
    .then(cohorts => {
      // console.log('co', typeof cohorts.members);
      if (isNaN(parseInt(quantity)) || opt === undefined || cohorts.members === []) {
        return res.render('teams/show', {
          cohorts: cohorts || {}, group: [], group2: {}
        });
      }
      // console.log('test');
      let quan_arr = cohorts.members.split(',').map(name => name.trim());
      let person = Math.floor(quan_arr.length / quantity);
      let person2 = Math.round(quan_arr.length / quantity);
      const teams = {};

      let quan = quantity;

      let arr = [];
      let num = quan_arr.length;

      if (opt === 'teamCount') {
        for (let i = 0; i < quantity; i++) {
          console.log('teamCount');
          arr[i] = [];
          for (let j = 0; j < person; j++) {
            let idx = Math.floor(Math.random() * quan_arr.length)
            arr[i].push(quan_arr[idx]);
            quan_arr.splice(idx, 1);
          }
        }
        // }
        // quan_arr only has people without groups
        let rest = quan_arr.length
        if (rest !== 0) {
          for (let k = 0; k < rest; k++) {
            let idx2 = Math.floor(Math.random() * quan_arr.length)
            arr[k].push(quan_arr[idx2]);
            quan_arr.splice(idx2, 1);
          }
        }
      } else {
        console.log('perTeam');
        for (let l = 1; l <= person2; l++) {
          teams[l] = [];
        }
        while (quan_arr.length > 0) {
          for (let team in teams) {
            let idx = Math.floor(Math.random() * quan_arr.length)
            let spl = quan_arr.splice(idx, 1);
            teams[team].push(spl[0]);
            if (quan_arr.length === 0) {
              break;
            }
          }
        }
      }
      res.render('teams/show', {
        cohorts: cohorts || {},
        group: arr || [],
        group2: teams || {}
      });

      // res.render('teams/show', {cohorts: cohorts || {}});
      // res.send(cohorts); --> so para testar
    })

  // res.send(req.params) --> so para testar
});

module.exports = router;
