import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper,
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import SalesRecord from './components/SalesRecord';
import SalesHistory from './components/SalesHistory';
import './App.css'; // Importa tu archivo CSS

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Ejemplo de color primario
    },
    secondary: {
      main: '#f50057', // Ejemplo de color secundario
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Ejemplo de tipografía
  },
});

function App() {
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem('books');
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  const [sales, setSales] = useState(() => {
    const storedSales = localStorage.getItem('sales');
    return storedSales ? JSON.parse(storedSales) : [];
  });

  const [costoTotalVentas, setCostoTotalVentas] = useState(0);

  const [showBookForm, setShowBookForm] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showSalesForm, setShowSalesForm] = useState(false);
  const [showSalesHistory, setShowSalesHistory] = useState(false);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales));
  }, [sales]);

  // Calcular costoTotalVentas al cargar y cuando cambian las ventas
  useEffect(() => {
    let costo = 0;
    for (const venta of sales) {
      const libroVendido = books.find(book => book.id === venta.bookId);
      if (libroVendido && !isNaN(parseFloat(libroVendido.costo))) {
        costo += parseFloat(libroVendido.costo) * venta.cantidad;
      }
    }
    setCostoTotalVentas(costo);
  }, [sales, books]); // Se ejecuta al cargar y cuando sales o books cambian

  const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  // Estado para controlar la sección visible
  const [activeSection, setActiveSection] = useState('inicio'); // 'inicio' para no mostrar nada al principio
  
  const [selectedBook, setSelectedBook] = useState(null);

  const addBook = (newBook) => {
    // Buscar si el libro ya existe en el inventario
    const existingBookIndex = books.findIndex(book => 
      book.titulo === newBook.titulo && 
      book.autor === newBook.autor && 
      book.año === newBook.año
    );

    if (existingBookIndex !== -1) {
      // El libro ya existe, actualizar el inventario
      const updatedBooks = [...books];
      updatedBooks[existingBookIndex].inventario += newBook.inventario;
      setBooks(updatedBooks);
    } else {
      // El libro no existe, agregarlo al inventario con un ID único
      setBooks([...books, { ...newBook, id: generateUniqueId() }]);
    }
  };

  const updateBook = (updatedBook) => {
    setBooks(books.map(book =>
      book.id === updatedBook.id ? updatedBook : book
    ));
  };

  const deleteBook = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  function limpiarHistorialVentas() {
    if (window.confirm('¿Estás seguro de que quieres eliminar el historial de ventas?')) {
      try {
        localStorage.removeItem('sales');
        setSales([]);
        setCostoTotalVentas(0); // Reiniciar costo total
      } catch (error) {
        console.error('Error al limpiar el historial de ventas:', error);
      }
    }
  }
  

  const registerSale = (newSale) => {
    const updatedBooks = books.map(book => {
      if (book.id === newSale.bookId) {
        return { ...book, inventario: book.inventario - newSale.cantidad };
      }
      return book;
    });
    setBooks(updatedBooks);
    setSales([...sales, newSale]);

    // Actualizar el costo total de ventas
    const libroVendido = books.find(book => book.id === newSale.bookId);
    if (libroVendido && !isNaN(libroVendido.costo)) { // Validar costo del libro
      setCostoTotalVentas(costoTotalVentas + (libroVendido.costo * newSale.cantidad));
    }
  };
  
  // Calcular las ganancias totales (usando parseFloat para asegurar números)
  const gananciasTotales = 
    sales.reduce((total, venta) => total + parseFloat(venta.precioTotal), 0) - costoTotalVentas;


    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" className="app-container">
          <Typography variant="h3" align="center" gutterBottom className="page-title">
            Librería App
          </Typography>
  
          <Grid container spacing={2} justifyContent="center" className="button-group">
            <Grid item>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => setActiveSection('agregarLibro')}
              >
                Agregar Libro
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => setActiveSection('inventario')}
              >
                Inventario
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => setActiveSection('registrarVenta')}
              >
                Registrar Venta
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => setActiveSection('historialVentas')}
              >
                Historial de Ventas
              </Button>
            </Grid>
          </Grid>
  
          {/* Mostrar la sección activa */}
          <Grid container spacing={3} mt={3}>
            {activeSection === 'agregarLibro' && (
              <Grid item xs={12}>
                <Paper elevation={3} className="form-container">
                  <BookForm onAddBook={addBook} /> 
                </Paper>
              </Grid>
            )}
  
            {activeSection === 'inventario' && (
              <Grid item xs={12}>
                <Paper elevation={3} className="inventory-container">
                  <BookList 
                    books={books} 
                    onUpdateBook={updateBook} 
                    onDeleteBook={deleteBook} 
                  />
                </Paper>
              </Grid>
            )}
  
            {activeSection === 'registrarVenta' && (
              <Grid item xs={12}>
                <Paper elevation={3} className="form-container">
                  <SalesRecord 
                    books={books} 
                    onRegisterSale={registerSale} 
                    selectedBook={selectedBook} 
                    onSelectBook={setSelectedBook} 
                  />
                </Paper>
              </Grid>
            )}
  
            {activeSection === 'historialVentas' && (
              <Grid item xs={12}>
                <Paper elevation={3} className="sales-history-container">
                  <SalesHistory sales={sales} />
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={limpiarHistorialVentas} 
                    className="clear-button"
                  >
                    Limpiar Historial de Ventas
                  </Button>
                </Paper>
              </Grid>
            )}
          </Grid>
  
          {/* Ganancias totales */}
          <Paper elevation={3} sx={{ p: 2, mt: 3 }} className="ganancias-container">
            <Typography variant="h6" align="center">
              Ganancias Totales: ${gananciasTotales.toFixed(2)}
            </Typography>
          </Paper>
        </Container>
      </ThemeProvider>
    );
  }
  
  export default App;