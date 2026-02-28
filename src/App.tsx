import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DiseaseProtocols from './pages/DiseaseProtocols';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-[72px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/protocols" element={<DiseaseProtocols />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;