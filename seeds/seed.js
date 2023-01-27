const sequelize = require('../config/connection');
const { User, Goal } = require('../models');

const userData = require('./userData.json');
const goalData = require('./goalData.json');
const sequelize = require('sequelize');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    //bulk create users and apply individual hooks to each user
    await User.bulkCreate(userData, {individualHooks: true});

    //bulk create goals from goal seed
    await Goal.bulkCreate(goalData);

    process.exit(0);
};

seedDatabase();