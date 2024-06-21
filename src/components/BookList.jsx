import React, { useState } from 'react';

const BookList = ({ books, onUpdateBook, onDeleteBook }) => {
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar el clic en el botón "Editar"
  const handleEditClick = (book) => {
    setEditingBook(book);
  };

  // Función para manejar el cambio en los campos de edición
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  // Función para manejar el clic en el botón "Guardar"
  const handleSaveClick = () => {
    onUpdateBook(editingBook);
    setEditingBook(null);
  };

  // Función para manejar el clic en el botón "Cancelar"
  const handleCancelClick = () => {
    setEditingBook(null);
  };

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

   // Agrupar libros por categoría
  const booksByCategory = {};
  books.forEach(book => {
    if (!booksByCategory[book.categoria]) {
      booksByCategory[book.categoria] = [];
    }
    booksByCategory[book.categoria].push(book);
  });

  // Filtrar libros según el término de búsqueda
  const filteredBooksByCategory = {};
  Object.keys(booksByCategory).forEach(category => {
    filteredBooksByCategory[category] = booksByCategory[category].filter(book => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        book.titulo.toLowerCase().includes(searchTermLower) ||
        book.autor.toLowerCase().includes(searchTermLower)
      );
    });
  });

  return (
    <div style={{ padding: '20px' }}>
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por título, autor o categoría"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />

      {Object.keys(filteredBooksByCategory).map(category => (
        <div key={category} style={{ marginBottom: '30px' }}>
          <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
            {category}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredBooksByCategory[category].map(book => (
              <li key={book.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
                {editingBook && editingBook.id === book.id ? (
                  // Formulario de edición
                  <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                      type="text"
                      name="titulo"
                      value={editingBook.titulo}
                      onChange={handleInputChange}
                      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <input
                      type="text"
                      name="autor"
                      value={editingBook.autor}
                      onChange={handleInputChange}
                      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <input
                      type="number"
                      name="año"
                      value={editingBook.año}
                      onChange={handleInputChange}
                      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <input
                      type="text"
                      name="categoria"
                      value={editingBook.categoria}
                      onChange={handleInputChange}
                      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <input
                      type="number"
                      name="precio"
                      value={editingBook.precio}
                      onChange={handleInputChange}
                      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <input
                      type="number"
                      name="inventario"
                      value={editingBook.inventario}
                      onChange={handleInputChange}
                      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        type="button" 
                        onClick={handleSaveClick}
                        style={{ 
                          padding: '8px 15px', 
                          backgroundColor: '#4CAF50', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '4px', 
                          cursor: 'pointer' 
                        }}
                      >
                        Guardar
                      </button>
                      <button 
                        type="button" 
                        onClick={handleCancelClick}
                        style={{ 
                          padding: '8px 15px', 
                          backgroundColor: '#f44336', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '4px', 
                          cursor: 'pointer' 
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  // Visualización de detalles del libro
                  <div>
                    <h3 style={{ margin: 0 }}>{book.titulo}</h3>
                    <p style={{ margin: '5px 0' }}>Autor: {book.autor}</p>
                    <p style={{ margin: '5px 0' }}>Año: {book.año}</p>
                    <p style={{ margin: '5px 0' }}>Categoría: {book.categoria}</p>
                    <p style={{ margin: '5px 0' }}>Precio: ${book.precio}</p>
                    <p style={{ margin: '5px 0' }}>Inventario: {book.inventario}</p>
                    <div style={{ marginTop: '10px' }}>
                      <button 
                        onClick={() => handleEditClick(book)}
                        style={{ 
                          padding: '6px 10px', 
                          backgroundColor: '#2196F3', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '4px', 
                          marginRight: '5px', 
                          cursor: 'pointer' 
                        }}
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => onDeleteBook(book.id)}
                        style={{ 
                          padding: '6px 10px', 
                          backgroundColor: '#f44336', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '4px', 
                          cursor: 'pointer' 
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BookList;