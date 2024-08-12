
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Landing from './components/landing';
import LoginAdmin from './components/loginAdmin';
import AdminDashboard from "./components/Admin_dashboard.js"
import LoginUser from './components/loginUser.js';
import HomePage from './components/homepage.js';
import RegisterUser from './components/registerUser.js';


function App() {
  return (
    <div className="App font-nunito">
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>}></Route>

          <Route path = "/admin">
            <Route path = "" element={<LoginAdmin/>}></Route>
            <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
          </Route>
          
          <Route path = "/user">
            <Route path = "" element={<LoginUser/>}></Route>
            <Route path='/user/register' element= {<RegisterUser/>}></Route>
            <Route path='/user/home' element={<HomePage/>}></Route>
          </Route>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
