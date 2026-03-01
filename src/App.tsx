import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DiseaseProtocols from './pages/DiseaseProtocols';
import Ergonomics from './pages/Ergonomics';
import Research from './pages/Research';
import Tools from './pages/Tools';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-[72px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/protocols" element={<DiseaseProtocols />} />
            <Route path="/ergonomics" element={<Ergonomics />} />
            <Route path="/research" element={<Research />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
