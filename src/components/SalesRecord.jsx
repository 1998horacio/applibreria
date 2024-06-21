import React, { useState, useEffect } from 'react';

const SalesRecord = ({ books, onRegisterSale }) => {
  const [bookId, setBookId] = useState('');
  const [cantidad, setCantidad] = useState(1); 
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    setSelectedBook(books.find(book => book.id === bookId));
  }, [bookId, books]);

  const handleRegisterSale = (e) => {
    e.preventDefault();

    if (!selectedBook) {
      alert('Selecciona un libro válido.');
      return;
    }

    if (cantidad <= 0 || cantidad > selectedBook.inventario) {
      alert('Cantidad inválida.');
      return;
    }

    // Obtener el precio del libro del array 'books'
    const precioLibro = books.find(book => book.id === bookId)?.precio; 

    if (!precioLibro) {
      alert('Error al obtener el precio del libro.');
      return;
    }

    const nuevaVenta = {
      fecha: new Date().toLocaleDateString(),
      titulo: selectedBook.titulo,
      cantidad: parseInt(cantidad),
      precioTotal: (precioLibro * cantidad).toFixed(2), // Usar precioLibro aquí
      bookId: selectedBook.id
    };

    onRegisterSale(nuevaVenta);

    setBookId('');
    setCantidad(1);
    setSelectedBook(null);
  };

  return (
    <div style={{ 
      padding: '22px', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      width: '400px' 
    }}>
      <h3 style={{ 
        marginBottom: '20px', 
        textAlign: 'center' 
      }}>Registrar Venta</h3>

      <form onSubmit={handleRegisterSale} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="libro" style={{ display: 'block', marginBottom: '5px' }}>Libro:</label>
          <select 
            id="libro" 
            value={bookId} 
            onChange={(e) => setBookId(e.target.value)} 
            required
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: '1px solid #ccc', 
              borderRadius: '4px'
            }}
          >
            <option value="">Selecciona un libro</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.titulo} (Inventario: {book.inventario})
              </option>
            ))}
          </select>
        </div>

        {selectedBook && ( 
          <div>
            <label htmlFor="cantidad" style={{ display: 'block', marginBottom: '5px' }}>Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(Math.min(parseInt(e.target.value) || 1, selectedBook.inventario))}
              min="1"
              max={selectedBook.inventario} 
              required
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ccc', 
                borderRadius: '4px' 
              }}
            />
            {selectedBook.inventario === 0 && (
              <p style={{ color: 'red', marginTop: '5px' }}>Este libro está agotado.</p>
            )}
          </div>
        )}

        <button 
          type="submit" 
          disabled={!selectedBook || selectedBook.inventario === 0}
          style={{
            backgroundColor: 'blue', 
            color: 'white', 
            padding: '10px', 
            border: 'none',
            borderRadius: '4px', 
            cursor: 'pointer'
          }}
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default SalesRecord;