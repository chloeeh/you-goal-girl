const router = require('express').Router();
const { User, Goal } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all projects and JOIN with user data
router.get('/', withAuth, async (req, res) => {
  try {
    const goalData = await Goal.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [User],
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
        user: goals[0].user,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET single goal by ID  
router.get('/goal/:id', withAuth, async (req, res) => {
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

// POST/CREATE new Post
router.post('/', withAuth, async (req, res) => {
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
  
  // // TODO: Future functionality
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
