import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import TourDetailPage from './components/TourDetailPage.jsx'
import ContactPage from './components/ContactPage.jsx'

console.log('Main.jsx loaded');

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (!rootElement) {
  console.error('Root element not found!');
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/tours/:id" element={<TourDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </StrictMode>,
  );
  console.log('App rendered successfully');
}
