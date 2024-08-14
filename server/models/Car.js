import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Car = sequelize.define('Car', {
  product_code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true, 
      len: [6, 6], 
    },
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, 
    },
  },
  power: DataTypes.STRING,
  engine_capacity: DataTypes.STRING,
  transmission: DataTypes.STRING,
  body_type: DataTypes.STRING,
  mileage: DataTypes.STRING,
  fuel_type: DataTypes.STRING,
  seats: DataTypes.STRING,
  drive_type: DataTypes.STRING,
  doors: DataTypes.STRING,
  year: DataTypes.STRING,
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    
  },
  benefits: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,    
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "Price is required" }, 
      min: 0, 
    },
  },
});

export default Car;
