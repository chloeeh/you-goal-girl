const sequelize = require('../config/connection');
const { User, Goal } = require('../models');

const userData = require('./userData.json');
const goalData = require('./goalData.json');
const sequelize = require('sequelize');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {individualHooks: true});

    await Goal.bulkCreate(goalData);

    process.exit(0);
};

seedDatabase();