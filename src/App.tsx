import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { GameInterface } from './pages/GameInterface';
import { AdminInterface } from './pages/AdminInterface';

function App() {
  return (
    <Router>
      <div className="min-h-screen dark:bg-gray-900">
        <Navigation />
        <main className="dark:bg-gray-900 mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<GameInterface />} />
            <Route path="/admin" element={<AdminInterface />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;