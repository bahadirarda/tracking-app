const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.models.User || mongoose.model('User', userSchema);


const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

const menuSchema = new mongoose.Schema({
  name: String,
  description: String,
  dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }],
  serveDates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuServeDate' }],
});
const Menu = mongoose.models.Menu || mongoose.model('Menu', menuSchema);

const dishSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
});
const Dish = mongoose.models.Dish || mongoose.model('Dish', dishSchema);

const menuServeDateSchema = new mongoose.Schema({
  date: Date,
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
});
const MenuServeDate = mongoose.models.MenuServeDate || mongoose.model('MenuServeDate', menuServeDateSchema);

const customerMenuSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
});
const CustomerMenu = mongoose.models.CustomerMenu || mongoose.model('CustomerMenu', customerMenuSchema);

module.exports = {
  User,
  Customer,
  Menu,
  Dish,
  MenuServeDate,
  CustomerMenu
};
