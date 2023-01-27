const User = require('./User');
const Goal = require('./Goal');

//User has many Goals--creates foreign key in goal table
User.hasMany(Goal, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Goal.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Goal };