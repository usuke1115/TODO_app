import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from "notistack";
import SignupForm from './features/signup';
import LoginForm from './features/login';
import NotFound from './utils/notfound';
import Home from './home';

function App() {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "top", horizontal: "center"}}>
      <Router>
        <Routes>
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </SnackbarProvider>
 )
}

export default App
