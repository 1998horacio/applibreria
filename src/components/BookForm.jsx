import React, { useState } from 'react';

const BookForm = ({ onAddBook }) => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [año, setAño] = useState('');
  const [categoria, setCategoria] = useState(''); // Puedes agregar opciones predefinidas
  const [inventario, setInventario] = useState('');
  const [precio, setPrecio] = useState('');
  const [mensajeExito, setMensajeExito] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const nuevoLibro = {
      titulo,
      autor,
      año: parseInt(año), // Asegurarse de que el año sea un número
      categoria,
      inventario: parseInt(inventario), // Asegurarse de que el inventario sea un número
      precio: parseFloat(precio), // Asegurarse de que el precio sea un número
    };

    onAddBook(nuevoLibro);

    // Mostrar mensaje de éxito
    setMensajeExito('¡Libro agregado correctamente!');
    setTimeout(() => {
      setMensajeExito(null);
    }, 5000); // Ocultar el mensaje después de 5 segundos

    // Limpiar los campos del formulario después de agregar el libro
    setTitulo('');
    setAutor('');
    setAño('');
    setCategoria('');
    setInventario('');
    setPrecio('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      padding: '20px', 
      border: '1px solid #eee', 
      borderRadius: '8px' 
    }}>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="titulo" style={{ display: 'block', marginBottom: '5px' }}>Título:</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          style={{ 
            width: '100%', 
            padding: '8px', 
            border: '1px solid #ccc', 
            borderRadius: '4px' 
          }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="autor" style={{ display: 'block', marginBottom: '5px' }}>Autor:</label>
        <input
          type="text"
          id="autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
          style={{ 
            width: '100%', 
            padding: '8px', 
            border: '1px solid #ccc', 
            borderRadius: '4px' 
          }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="año" style={{ display: 'block', marginBottom: '5px' }}>Año:</label>
        <input
          type="number"
          id="año"
          value={año}
          onChange={(e) => setAño(e.target.value)}
          required
          min="1" // El año mínimo será 1
          style={{ 
            width: '100%', 
            padding: '8px', 
            border: '1px solid #ccc', 
            borderRadius: '4px' 
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="categoria" style={{ display: 'block', marginBottom: '5px' }}>Categoría:</label>
        <select 
          id="categoria" 
          value={categoria} 
          onChange={(e) => setCategoria(e.target.value)}
          required
          style={{ 
            width: '100%', 
            padding: '8px', 
            border: '1px solid #ccc', 
            borderRadius: '4px' 
          }}
        >
          <option value="">Selecciona una categoría</option>
          <option value="Ficción">Ficción</option>
          <option value="Ciencia">Ciencia</option>
          <option value="Historia">Historia</option>
          <option value="No Ficción">No Ficción</option>
          {/* Agrega más opciones según tus categorías */}
        </select>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="inventario" style={{ display: 'block', marginBottom: '5px' }}>Inventario:</label>
        <input
          type="number"
          id="inventario"
          value={inventario}
          onChange={(e) => setInventario(e.target.value)}
          required
          min="1" // El inventario mínimo será 1
          style={{ 
            width: '100%', 
            padding: '8px', 
            border: '1px solid #ccc', 
            borderRadius: '4px' 
          }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="precio" style={{ display: 'block', marginBottom: '5px' }}>Precio:</label>
        <input
          type="number" 
          id="precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
          step="0.01"
          min="0.01" // El precio mínimo será 0.01
          style={{ 
            width: '100%', 
            padding: '8px', 
            border: '1px solid #ccc', 
            borderRadius: '4px' 
          }}
        /> 
      </div>

      {mensajeExito && ( 
        <div style={{ 
          backgroundColor: 'green', 
          color: 'white', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '10px' 
        }}>
          {mensajeExito}
        </div>
      )}

      <button type="submit" style={{ 
        padding: '10px 20px', 
        backgroundColor: '#4CAF50', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer' 
      }}>
        Agregar Libro
      </button>
    </form>
  );
};

export default BookForm;