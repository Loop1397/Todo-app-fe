import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
      if(storedToken) {
        // 컴포넌트가 로드될 때 api.js에서 이미 token을 헤더에 넣는 작업이 이루어짐
        // 그래서 다른 작업만 해주면 그만
        
        const response = await api.get('/user/me');
        setUser(response.data.user);
      }
     
    } catch(error) {
      // 뭐든 실패하면 유저 데이터는 없는 것이니 null로 세팅
      setUser(null);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  
  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute user = {user}>
          <TodoPage />
        </PrivateRoute>
      } />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />
    </Routes>
  );
}

export default App;
