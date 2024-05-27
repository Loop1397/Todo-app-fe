import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secPassword, setSecPassword] = useState('');

  // 에러 메세지를 저장하기 위한 state
  const [error, setError] = useState('');

  // 다른 페이지로 넘어가기 위한 인터페이스
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // submit은 원래 페이지를 새로고침하는데, 그 새로고침을 막기위해 event.preventDefault()를 사용
    event.preventDefault();

    try {
      if(password !== secPassword) {
        throw new Error("패스워드가 일치하지 않습니다. 다시 입력해주세요.");
      }

      const response = await api.post("/user", {name, email, password});
      if(response.status === 200) {
        navigate('/login');
      } else {
        throw new Error(response.data.error);
      }

    } catch(error) {
      setError(error.message);
    }


    
  }
  return (
    <div className="display-center">
      {/* &&는 조건부 렌더링을 위한 react의 연산자로, &&의 왼쪽이 true라면 &&의 오른쪽을 렌더링함 */}
      {error && <div className="red-error">{error}</div>}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          {/* onChange = 내부의 값이 바뀔때마다 콜백함수 실행 */}
          <Form.Control type="string" placeholder="Name" onChange={(event) => setName(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control type="password" placeholder="re-enter the password" onChange={(event) => setSecPassword(event.target.value)}/>
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
