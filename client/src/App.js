
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Landing from './components/landing';
import LoginAdmin from './components/loginAdmin';
import AdminDashboard from "./components/Admin_dashboard.js"
import LoginUser from './components/loginUser.js';
import HomePage from './components/homepage.js';
import RegisterUser from './components/registerUser.js';
import DisplayPropertyDetails from './components/DisplayPropertyDetails.js';
import SellerLandingPage from './components/SellerLandingPage.js';
import DisplayProperty from './components/DisplayProperty.js';
import CreatePropertyForm from './components/CreatePropertyForm.js';
import DraftPropertyPage from './components/DRaftPropertyPage.js';
import CreatePropertyForm2 from './components/CreatePropertyForm2.js';
import ViewSavedProperty from './components/ViewSavedProperty.js';

function App() {
  return (
    <div className="App font-nunito">
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route path='/displayproperty' element={ <DisplayPropertyDetails/> }></Route>

          <Route path = "/admin">
            <Route path = "" element={<LoginAdmin/>}></Route>
            <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
          </Route>
          
          <Route path = "/user">
            <Route path = "" element={<LoginUser/>}></Route>
            <Route path='/user/register' element= {<RegisterUser/>}></Route>
            <Route path='/user/home' element={<HomePage/>}></Route>
            
          </Route>
          <Route path='user/savedproperty' element = {<ViewSavedProperty /> } ></Route>

          <Route path='seller' element={<SellerLandingPage />}>
              <Route path='/seller/viewproperty' element={ <DisplayProperty />}></Route>
              <Route path='/seller/createproperty' element={ <CreatePropertyForm2  />}></Route>
              <Route path='/seller/draftproperty' element={ <DraftPropertyPage />}></Route>
          </Route>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
