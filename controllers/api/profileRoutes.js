const router = require('express').Router();
const { User, Goal } = require('../../models');
const withAuth = require('../../utils/auth');

// TODO: Remember to include withAuth,
// TODO: /goal or / ??
// Get all projects and JOIN with user data
router.get('/', async (req, res) => {
  try {
    const goalData = await Goal.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'name',
        'description',
        'start_date',
        'end_date'
      ],
    });
    const goals = goalData.map((goal) => goal.get({ plain: true }));
    res.render('profile', {
        goals,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO: Remember to include withAuth,
// GET single goal by ID  
router.get('/goal/:id', async (req, res) => {
  try {
    const goalData = await Goal.findByPk(req.params.id, {
        include: [
            {
            model: User,
            attributes: ['username'],
            },
        ],
    });

    const goal = goalData.get({ plain: true });

    res.render('goals', {
        ...goal,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO: Remember to include withAuth,
// POST/CREATE new Post
router.post('/', async (req, res) => {
    try {
      const newGoal = await Goal.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newGoal);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // // TODO: Remember to include withAuth,
  // // DELETE Post
  // router.delete('/goal/:id', async (req, res) => {
  //   try {
  //     const goalData = await Goal.destroy({
  //       where: {
  //         id: req.params.id,
  //         user_id: req.session.user_id,
  //       },
  //     });
  
  //     if (!goalData) {
  //       res.status(404).json({ message: 'This post no longer exists!' });
  //       return;
  //     }
  
  //     res.status(200).json(goalData);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });

module.exports = router;
