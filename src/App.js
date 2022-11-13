import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import POSpage from './pages/POSpage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'
import ShowCarsPage from './pages/ShowCarsPage';
import RegistrationForm from './components/RegistrationForm';
import CustomizedDialogs from './components/Dialog';
import {carFields, itemFields} from './constants/formFields'

function App() {
  return (
    <div className="min-h-full sm:h-screen bg-slate-200 bg-[url('./assets/images/danblab_logo.png')] bg-cover bg-center mx-auto"> 
    <div className='w-full h-full backdrop-blur-sm'>
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/pos' element={<POSpage />} />
            <Route path='/cars' element={<ShowCarsPage />} />
            <Route path='/add_car' element={<CustomizedDialogs title="إضافة سيارة" ><RegistrationForm fields={carFields} /></CustomizedDialogs>} />
            <Route path='/add_item' element={<CustomizedDialogs title="إضافة اسبير" ><RegistrationForm fields={itemFields} /></CustomizedDialogs>} />
          </Routes>
        </Router>
    </div>
    </div>
  );
}

export default App;
