import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
// import FlashCardsPage from './pages/FlashCardsPage';
// import AboutPage from './pages/AboutPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/flashcards" element={<FlashCardsPage />} /> */}
          {/* <Route path="/about" element={<AboutPage />} /> */}
        </Routes>
      </Router>
      
    </>
  )
}

export default App
