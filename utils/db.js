const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.insertCar = async (car) => {
  const insert = 'INSERT INTO cars (id, locationName, modelYear) VALUES ($1, $2, $3)';
  const query = {
    text: insert, 
    values: [`${car.vin}`, `${car.locationName}`, `${car.modelYear}`],
  };

  await pool.query(query);
};

exports.findCar = async (vin) => {
  const select = `SELECT id FROM cars where id = $1`;
  const query = {
    text: select,
    values: [`${vin}`],
  };

  const {rows} = await pool.query(query);
  return rows.length === 1;
};

exports.removeCar = async (vin) => {
  const del = 'DELETE FROM cars where cars.id = $1';
  const query = {
    text: del,
    values: [`${vin}`],
  };

  await pool.query(query);
};

console.log(`Connected to database '${process.env.POSTGRES_DB}'`);
