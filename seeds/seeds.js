const sequelize = require('../config/connection');
const Admin = require('../models/Admin');
const Product = require('../models/Product');

const adminData = require('./adminData.json');
const productData = require('./productData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const user of adminData) {
    try {
      await Admin.create({
        ...user,
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
  console.log('synced users');

  for (const product of productData) {
    try {
      await Product.create({
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
