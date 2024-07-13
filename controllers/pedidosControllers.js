
const pool = require('../data/db.js');

const traerpedidos = async (req,res)=>{
    try {
        const connection = await pool.getConnection();
        const sql = 'SELECT * FROM pedidos'
        const [rows, fields] = await connection.query(sql);
        connection.release();
        res.json(rows);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al consultar la base de datos');
    }
}

const traerUnPedido= async (req,res)=>{
    try {
        const connection = await pool.getConnection();
        const id = req.params.id;
        const sql = 'SELECT * FROM pedidos WHERE PedidoID = ?';

        const [rows, fields] = await connection.query(sql, [id]);
        connection.release();
        if (rows.length === 0) {
            res.status(404).send('Pedido no encontrado');
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al consultar la base de datos');
    }
}

const crearPedido = async (req,res)=>{
    try {
        const connection = await pool.getConnection();

        const userData = req.body; 
  
        const sql = 'INSERT INTO pedidos SET ?'; 
        const [rows] = await connection.query(sql, [userData]);
        connection.release();
        res.json({mensaje: 'Pedido agregado', id: rows.insertId});

    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
    }  
}

const actualizarPedido = async (req,res) =>{
    try {
        const connection = await pool.getConnection();

        const id = req.params.id; 
        const userData = req.body; 
        console.log(userData);
        
        const sql = 'UPDATE pedidos SET ? WHERE PedidoID = ?'; 
        const [rows] = await connection.query(sql, [userData, id]);
        connection.release();
        if (rows.affectedRows === 0) {
            res.status(404).send('Pedido no encontrado');
        } else {
            res.json({ mensaje: 'Pedido actulizado' });
        }
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
    }
}

const borrarPedido = async (req,res)=>{
    try {
        const connection = await pool.getConnection();
        const id = req.params.id;

        const sql = 'DELETE FROM pedidos WHERE PedidoID = ?';
        const [rows] = await connection.query(sql, [id]);
        connection.release();
        if (rows.affectedRows === 0) {
            res.status(404).send('Pedido no encontrada');
        } else {
            res.json({ mensaje: 'Pedido eliminada' });
        }
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al consultar la base de datos');
    }     
}


module.exports= {traerpedidos,traerUnPedido,crearPedido,actualizarPedido,borrarPedido };