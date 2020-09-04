import React from 'react';
import { Provider } from 'react-redux';
import store from './store'
import Productos from './components/Productos';
import Carrito from './components/Carrito';
import "./styles/style.scss";
import "./styles/mobileStyle.scss";
import Footer from './components/Footer';

const  App = () => (
  <Provider store={store}>
  
    <main>
  
      <Productos />
      <Carrito />
      <Footer />
  
    </main>
  
  </Provider>
)

export default App;
