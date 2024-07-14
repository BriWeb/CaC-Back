const pool = require('../data/db.js');

const traerProveedores = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const sql = 'SELECT * FROM proveedores';
        const [rows, fields] = await connection.query(sql);
        connection.release();
        res.json(rows);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al consultar la base de datos');
    }
}

const traerUnProveedor = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const id = req.params.id;
        const sql = 'SELECT * FROM proveedores WHERE ProveedorID = ?';
        const [rows, fields] = await connection.query(sql, [id]);
        connection.release();
        if (rows.length === 0) {
            res.status(404).send('Proveedor no encontrado');
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al consultar la base de datos');
    }
}

const crearProveedor = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const userData = req.body;
        const sql = 'INSERT INTO proveedores SET ?';
        const [rows] = await connection.query(sql, [userData]);
        connection.release();
        res.json({ mensaje: 'Proveedor agregado', id: rows.insertId });
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
    }
}

const actualizarProveedor = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const id = req.params.id;
        const userData = req.body;
        const sql = 'UPDATE proveedores SET ? WHERE ProveedorID = ?';
        const [rows] = await connection.query(sql, [userData, id]);
        connection.release();
        if (rows.affectedRows === 0) {
            res.status(404).send('Proveedor no encontrado');
        } else {
            res.json({ mensaje: 'Proveedor actualizado' });
        }
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
    }
}

const borrarProveedor = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const id = req.params.id;
        const sql = 'DELETE FROM proveedores WHERE ProveedorID = ?';
        const [rows] = await connection.query(sql, [id]);
        connection.release();
        if (rows.affectedRows === 0) {
            res.status(404).send('Proveedor no encontrado');
        } else {
            res.json({ mensaje: 'Proveedor eliminado' });
        }
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al consultar la base de datos');
    }
}

module.exports = { traerProveedores, traerUnProveedor, crearProveedor, actualizarProveedor, borrarProveedor };
