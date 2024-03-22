const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const users = require('./users.json');
const blog = require('./blog.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const user of users) {
    try {
      await User.create({
        ...user,
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
  console.log('synced users');

  for (const product of blog) {
    try {
      await Post.create({
        ...product,
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }
  console.log('synced products');

  process.exit(0);
};

seedDatabase();
