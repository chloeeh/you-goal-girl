// const sequelize = require('../config/connection')
const { User, Goal } = require('../models');

const userData = require('./userData.json');
const seedGoalData = require('./goalData.json');
const sequelize = require('sequelize');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await seedGoalData();

    process.exit(0);
};

seedDatabase();