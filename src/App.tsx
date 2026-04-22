import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DiseaseProtocols from './pages/DiseaseProtocols';
import Ergonomics from './pages/Ergonomics';
import AthleticsGuide from './pages/AthleticsGuide';
import Research from './pages/Research';
import Tools from './pages/Tools';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import GlobalBackdrop from './components/GlobalBackdrop';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <GlobalBackdrop />
      <div className="min-h-screen flex flex-col relative">
        <Navbar />
        <main className="flex-1 pt-[72px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/protocols" element={<DiseaseProtocols />} />
            <Route path="/ergonomics" element={<Ergonomics />} />
            <Route path="/athletics" element={<AthleticsGuide />} />
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
