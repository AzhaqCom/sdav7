import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { GameInterface } from './pages/GameInterface';
import { AdminInterface } from './pages/AdminInterface';
import { Rule } from './pages/Rule';

function App() {
  return (
    <Router>
      <div className="min-h-screen dark:bg-gray-900">
        <Navigation />
        <main className="dark:bg-gray-900 mx-auto px-4 py-8">
          <Routes>
            <Route path="/sdav7/" element={<GameInterface />} />
            <Route path="/sdav7/admin" element={<AdminInterface />} />
            <Route path="/sdav7/rule" element={<Rule />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;