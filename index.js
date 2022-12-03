require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const db = require('./utils/db');
const sms = require('./utils/sms');

uri = process.env.ENDPOINT;
const intervalTimeout = 300000 // 5-minute intervals

const buildCar = (vin, locationName, modelYear) => {
    return {
        vin: vin,
        locationName: locationName,
        modelYear: modelYear,
    };
};
const initialSetup = async () => {
    const response = await fetch(uri);
    const data = await response.json();
    for (const item of data) {
        for (const car of item.vehicles) {
            const seen = await db.findCar(car.vin);
            if (!seen) {
                const vehc = buildCar(car.vin, car.locationName, car.year);
                await db.insertCar(vehc);
            }
        }
    }
};

const getData = async () => {
    const response = await fetch(uri);
    const data = await response.json();
    for (const item of data) {
        for (const car of item.vehicles) {
            const seen = await db.findCar(car.vin);
            if (!seen) {
                const vehc = buildCar(car.vin, car.locationName, car.year);
                await db.insertCar(vehc);
                await sms.sendMessage(vehc);
            }
        }
    }
};

initialSetup();
setInterval(() => getData(), intervalTimeout);
