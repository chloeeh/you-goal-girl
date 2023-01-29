const router = require('express').Router();
const { User, Goal } = require('../../models');
const withAuth = require('../../utils/auth');

// TODO: Remember to include withAuth,
// Get all projects and JOIN with user data
router.get('/', async (req, res) => {
  try {
    const goalData = await Goal.findAll({
        include: [
            {
            model: Goal,
            attributes: ['name'],
            },
        ],
    });

    const goals = goalData.map((goal) => goal.get({ plain: true }));
    res.render('goals', {
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
            attributes: ['name'],
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
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // TODO: Remember to include withAuth,
  // DELETE Post
  router.delete('/:id', async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'This post no longer exists!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
