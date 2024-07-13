--create database productos;

--use productos;

CREATE TABLE Categorias (
    CategoriaID INT PRIMARY KEY AUTO INCREMENT,
    Nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Proveedores (
    ProveedorID INT PRIMARY KEY AUTO INCREMENT,
    Nombre VARCHAR(50) NOT NULL,
    Contacto VARCHAR(50)
);

CREATE TABLE Productos (
    ProductoID INT PRIMARY KEY AUTO INCREMENT,
    Nombre VARCHAR(50) NOT NULL,
    CategoriaID INT,
    ProveedorID INT,
    Precio DECIMAL(10, 2),
    FOREIGN KEY (CategoriaID) REFERENCES Categorias(CategoriaID),
    FOREIGN KEY (ProveedorID) REFERENCES Proveedores(ProveedorID)
);

CREATE TABLE Pedidos (
    PedidoID INT PRIMARY KEY AUTO INCREMENT,
    ProductoID INT,
    Cantidad INT,
    Fecha DATE,
    FOREIGN KEY (ProductoID) REFERENCES Productos(ProductoID)
);

INSERT INTO Categorias (Nombre) VALUES
('Electronica'),
('Accesorios'),
('Perifericos');

INSERT INTO Proveedores (Nombre, Contacto) VALUES
('Proveedor A', 'contacto_a@correo.com'),
('Proveedor B', 'contacto_b@correo.com'),
('Proveedor C', 'contacto_c@correo.com');

INSERT INTO Productos (Nombre, CategoriaID, ProveedorID, Precio) VALUES
('Laptop', 1, 1, 1000),
('Mouse', 2, 2, 20),
('Teclado', 2, 2, 50),
('Monitor', 3, 3, 200);

INSERT INTO Pedidos (ProductoID, Cantidad, Fecha) VALUES
(1, 2, '2024-07-10'),
(2, 5, '2024-07-11'),
(3, 3, '2024-07-12'),
(4, 1, '2024-07-12');