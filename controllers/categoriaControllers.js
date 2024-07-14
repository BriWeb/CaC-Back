const pool = require('../data/db.js');

const traerCategorias = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const sql = 'SELECT * FROM categorias';
        const [rows, fields] = await connection.query(sql);
        connection.release();
        res.json(rows);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al consultar la base de datos');
    }
}

const traerUnaCategoria = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const id = req.params.id;
        const sql = 'SELECT * FROM categorias WHERE CategoriaID = ?';
        const [rows, fields] = await connection.query(sql, [id]);
        connection.release();
        if (rows.length === 0) {
            res.status(404).send('Categoría no encontrada');
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al consultar la base de datos');
    }
}

const crearCategoria = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const userData = req.body;
        const sql = 'INSERT INTO categorias SET ?';
        const [rows] = await connection.query(sql, [userData]);
        connection.release();
        res.json({ mensaje: 'Categoría agregada', id: rows.insertId });
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
    }
}

const actualizarCategoria = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const id = req.params.id;
        const userData = req.body;
        const sql = 'UPDATE categorias SET ? WHERE CategoriaID = ?';
        const [rows] = await connection.query(sql, [userData, id]);
        connection.release();
        if (rows.affectedRows === 0) {
            res.status(404).send('Categoría no encontrada');
        } else {
            res.json({ mensaje: 'Categoría actualizada' });
        }
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
    }
}

const borrarCategoria = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const id = req.params.id;
        const sql = 'DELETE FROM categorias WHERE CategoriaID = ?';
        const [rows] = await connection.query(sql, [id]);
        connection.release();
        if (rows.affectedRows === 0) {
            res.status(404).send('Categoría no encontrada');
        } else {
            res.json({ mensaje: 'Categoría eliminada' });
        }
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al consultar la base de datos');
    }
}

module.exports = { traerCategorias, traerUnaCategoria, crearCategoria, actualizarCategoria, borrarCategoria };
