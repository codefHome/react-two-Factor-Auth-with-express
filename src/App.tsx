
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterUser from "./components/UserRegistrationPage";
import UserDashboard from "./components/UserDashboard";
import NotFound from "./components/NotFound";


function App() {
const userInfo= JSON.parse(localStorage.getItem('token')!)
  return (
    <>
      <div className='flex lg:justify-center lg:items-center h-auto bg-white '>
       
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/userDashboard" element={userInfo.token !== null ? <UserDashboard /> : <LoginPage/>} />
          <Route path="/registerUser" element={<RegisterUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

    </>
  );
}

export default App;

