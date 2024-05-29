import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";

import { Link, Navigate, useNavigate } from "react-router-dom";

const LoginPage = ({user, setUser}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async(event) => {
    event.preventDefault();
    try {
      const response = await api.post("/user/login", {email, password});
      
      // 만약 로그인에 성공한다면 if문 진입
      if(response.status === 200) {
        // 토큰 및 유저정보 저장
        // local storage : 브라우저를 닫아도 사라지지 않는 데이터 저장소
        // session storage : 브라우저를 닫으면 리셋되는 데이터 저장소
        setUser(response.data.user);
        sessionStorage.setItem('token', response.data.token);

        // token은 앞으로 api호출 시 header에 넣어서 전달할거임
        // token을 'authorization'이란 이름을 붙여서 헤더를 통해 전달
        // Bearer는 토큰값을 보낼 때 붙이는 암묵의 룰같은 것.
        api.defaults.headers["authorization"] = "Bearer " + response.data.token;
        setError("");

        navigate("/");
      }
      
      throw new Error(response.message);
    } catch(error) {
      setError(error.message);
    }
  }

  if(user) {
    return <Navigate to="/"/>
  }

  return (
    <div className="display-center">
      {error && <div className="red-error">{error}</div>}
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
