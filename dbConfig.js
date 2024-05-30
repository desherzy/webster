const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'webster', 
    `${process.env.DB_USER}`, 
    `${process.env.DB_PASS}`, 
    {
    host: `${process.env.DB_HOST}`,
    dialect: 'mysql',
    retry: {
        match: [/Deadlock/i], // If we have deadlock, than retry with the backoff in ms
        max: 3, 
        backoffBase: 1000,
        backoffExponent: 1.5,
      },
});


module.exports = { sequelize };