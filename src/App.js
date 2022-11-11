import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import POSpage from './pages/POSpage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'
import ShowCarsPage from './pages/ShowCarsPage';

function App() {
  return (
    <div className="min-h-full sm:h-screen bg-gray-300 mx-auto"> 
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/pos' element={<POSpage />} />
            <Route path='/cars' element={<ShowCarsPage />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
