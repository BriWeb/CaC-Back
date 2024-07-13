
const pool = require('../data/db.js');

const traerproductos= async (req,res)=>{
    try {
        const connection = await pool.getConnection();
        const sql = 'SELECT * FROM productos'
        const [rows, fields] = await connection.query(sql);
        connection.release();
        res.json(rows);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al consultar la base de datos');
    }
}

const traerUnProducto= async (req,res)=>{
    try {
        const connection = await pool.getConnection();
        const id = req.params.id;
        const sql = 'SELECT * FROM productos WHERE ProductoID = ?';

        const [rows, fields] = await connection.query(sql, [id]);
        connection.release();
        if (rows.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al consultar la base de datos');
    }
}

const crearProducto = async (req,res)=>{
    try {
        const connection = await pool.getConnection();

        const userData = req.body; 
  
        const sql = 'INSERT INTO productos SET ?'; 
        const [rows] = await connection.query(sql, [userData]);
        connection.release();
        res.json({mensaje: 'producto agregado', id: rows.insertId});

    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
    }  
}

const actualizarProducto = async (req,res) =>{
    try {
        const connection = await pool.getConnection();

        const id = req.params.id; 
        const userData = req.body; 
        console.log(userData);
        
        const sql = 'UPDATE productos SET ? WHERE ProductoID = ?'; 
        const [rows] = await connection.query(sql, [userData, id]);
        connection.release();
        if (rows.affectedRows === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json({ mensaje: 'Producto actulizado' });
        }
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
    }
}

const borrarProducto = async (req,res)=>{
    try {
        const connection = await pool.getConnection();
        const id = req.params.id;

        const sql = 'DELETE FROM productos WHERE ProductoID = ?';
        const [rows] = await connection.query(sql, [id]);
        connection.release();
        if (rows.affectedRows === 0) {
            res.status(404).send('Producto no encontrada');
        } else {
            res.json({ mensaje: 'Producto eliminada' });
        }
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al consultar la base de datos');
    }     
}


module.exports= {traerproductos,traerUnProducto,crearProducto,actualizarProducto,borrarProducto };