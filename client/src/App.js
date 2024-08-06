
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Landing from './components/landing';
import LoginAdmin from './components/loginAdmin';
import AdminDashboard from "./components/Admin_dashboard.js"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route path = "/admin">
            <Route path = "" element={<LoginAdmin/>}></Route>
            <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
          </Route>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
