import React from 'react';

const SalesHistory = ({ sales }) => {
  return (
    <div style={{
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      maxWidth: '800px', // Limita el ancho máximo de la tabla
      overflowX: 'auto' // Agrega una barra de desplazamiento horizontal si es necesario
    }}>
      <h2 style={{ marginBottom: '15px' }}>Historial de Ventas</h2>

      {sales.length === 0 ? (
        <p>No hay ventas registradas.</p>
      ) : (
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          textAlign: 'left' 
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={styles.th}>Fecha</th>
              <th style={styles.th}>Título</th>
              <th style={styles.th}>Cantidad</th>
              <th style={styles.th}>Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={index} style={{ 
                borderBottom: '1px solid #ccc' 
              }}>
                <td style={styles.td}>{sale.fecha}</td>
                <td style={styles.td}>{sale.titulo}</td>
                <td style={styles.td}>{sale.cantidad}</td>
                <td style={styles.td}>{sale.precioTotal}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Estilos reutilizables para las celdas de la tabla
const styles = {
  th: {
    padding: '10px',
    fontWeight: 'bold'
  },
  td: {
    padding: '8px'
  }
};

export default SalesHistory;

