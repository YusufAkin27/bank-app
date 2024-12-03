import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter'ı burada kullanıyoruz
import { ChakraProvider } from "@chakra-ui/react";
import App from './App'; // Ana App bileşeni
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; // MDBootstrap CSS

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter> {/* BrowserRouter burada tanımlanmış */}
    <ChakraProvider> {/* ChakraProvider ile sarmala */}
      <App />
    </ChakraProvider>
  </BrowserRouter>
);
