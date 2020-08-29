import React from 'react';
import {Productos} from './components/Produtos';
import {Carrito} from './components/Carrito';
import {Footer} from './components/Footer';

function App() {
  return (
    <main>
      <Productos />
      <Carrito />
      <Footer />
    </main>
  );
}

export default App;
