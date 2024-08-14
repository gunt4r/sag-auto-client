import {Sequelize} from 'sequelize'

// eslint-disable-next-line no-undef
const sequelize = new Sequelize("sag-auto","postgres", "1234", {
    host: 'localhost',
    dialect: 'postgres'
  })

export default sequelize