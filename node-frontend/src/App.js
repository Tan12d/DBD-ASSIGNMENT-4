import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Quotes from "./Quotes";
// import Contact  from './Contact';
import Customer from './Customer';
import CustomerInsert from './CustomerInsert';
import CustomerUpdate from './CustomerUpdate';
// import Edit from './CustomerEdit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div className="App">
          <header className="App-header">
            <Quotes />
          </header>
        </div>} />
        <Route path='customer' element={<Customer />} />
        <Route path='customer/insert' element={<CustomerInsert />} />
        <Route path='customer/:id/update' element={<CustomerUpdate />} />
        {/* <Route path='customer/edit' element={<Edit />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
