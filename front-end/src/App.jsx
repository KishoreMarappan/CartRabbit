import {BrowserRouter , Routes , Route} from 'react-router-dom';
import SignUp from './components/signup.jsx';
import Login from './components/Login.jsx';
import Home from './components/home.jsx';
import ForgotPass from './components/forgotpassword.jsx';
import ResetPasword from './components/ResetPasword.jsx';
import AdminDashboard from './components/AdminWaitlist/AdminDashboard.jsx';
import AddWaitlist from './components/AdminWaitlist/AddWaitlist.jsx';
import DeleteWaitlist from './components/AdminWaitlist/DeleteWaitlist.jsx';
import HomePage from './components/AdminWaitlist/HomePage.jsx';
import UpdateWaitlist from './components/AdminWaitlist/UpdateWaitlist.jsx';
import ViewWaitlist from './components/AdminWaitlist/ViewWaitlist.jsx';
import UserWaitlistPage from './components/UserFiles/UserWaitlistPage.jsx';
import UserViewList from './components/UserFiles/Userviewlist.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element = {<Login />} ></Route>
        <Route path='/login' element = {<Login />} ></Route>
        <Route path='/signup' element={<SignUp />}> </Route>
        <Route path='/home' element={<Home />}> </Route>
        <Route path='/forgotpassword' element={<ForgotPass />}> </Route>
        <Route path='/resetpassword/:token' element={<ResetPasword />}> </Route>
        <Route path='/admindashboard' element={<AdminDashboard />}> </Route>       
        <Route path='/addwaitlist' element={<AddWaitlist />}> </Route>       
        <Route path='/delete-waitlist' element={<DeleteWaitlist />}> </Route> 
        <Route path='/admin-homepage' element={<HomePage />}> </Route>        
        <Route path='/update-waitlist' element={<UpdateWaitlist />}> </Route>       
        <Route path='/user-waitlist' element={<UserWaitlistPage />}> </Route>       
        <Route path='/user-viewlist' element={<UserViewList />}> </Route>       
        <Route path="/view-waitlist/:id" element={<ViewWaitlist />}> </Route>       
      </Routes>
    </BrowserRouter>
  )
}

export default App;
