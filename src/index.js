import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';
import App from './App';
import Read from './components/read';
import Edit from './components/edit';
import Create from './components/create';
import reportWebVitals from './reportWebVitals';
import { OriginsProvider } from './OriginsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <OriginsProvider>
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/read/:name" element={<Read />}/>
      <Route path="/edit/:name" element={<Edit />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
  </OriginsProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
