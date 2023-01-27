const router = require('express').Router();
const { Goal, User } = require('../models');
const withAuth = require('../utils/auth');

// Get all projects and JOIN with user data
router.get('/', withAuth, async (req, res) => {
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
    res.render('goalpage', {
        goals,
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
            attributes: ['name'],
            },
        ],
    });

    const goal = goalData.get({ plain: true });

    res.render('goal', {
        ...goal,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/goal');
        return;
    }
    res.render('login');
});

module.exports = router;
