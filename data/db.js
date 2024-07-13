const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    waitForConnections: true,
    connectionLimit: 5
});

pool.getConnection()
.then(connection => {
    pool.releaseConnection(connection);
    console.log('Conexion a bd: Exitosa.');
})
.catch(err => {
    console.error('Error al conectar la bd: ', err);
});

module.exports = pool;