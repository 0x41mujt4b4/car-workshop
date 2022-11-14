import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import POSpage from './pages/POSpage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'
import ShowCarsPage from './pages/ShowCarsPage';
import AddProduct from './components/AddItem';
import AddCar from './components/AddCar'

function App() {
  return (
    <div className="min-h-full sm:h-screen bg-slate-300 bg-cover bg-center mx-auto"> 
    <div className='w-full h-full'>
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/pos' element={<POSpage />} />
            <Route path='/cars' element={<ShowCarsPage />} />
            <Route path='/add_car' element={<AddCar />} />
            <Route path='/add_item' element={<AddProduct />} />
          </Routes>
        </Router>
    </div>
    </div>
  );
}

export default App;
