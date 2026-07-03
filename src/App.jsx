// src/App.jsx
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importando as páginas que criamos
import { Home } from './pages/Home';
import { Ficha } from './pages/Ficha';
import { CriadorPersonagem } from './pages/CriadorPersonagem';
import { Mesa } from './pages/Mesa'; // <--- IMPORTAMOS A TELA NOVA

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ficha/:id" element={<Ficha />} />
        <Route path="/criar" element={<CriadorPersonagem />} />
        <Route path="/editar/:id" element={<CriadorPersonagem />} />
        <Route path="/mesa/:codigoSala" element={<Mesa />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App