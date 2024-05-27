
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "../components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import api from "../utils/api";

const TodoPage = () => {
  // useState안에 들어가 있는 값은 todoList의 초기값으로 사용됨
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  const getTasks = async () => {
    const response = await api.get('/tasks');
    setTodoList(response.data.data);
  };

  const addTask = async () => {
    try {
      // api 요청. 뒤의 {}는 body로 전달됨
      const response = await api.post('/tasks', {
        task:todoValue, 
        isComplete:false
      });
      
      if(response.status === 200) {
        console.log('success!');
        setTodoValue('');
        getTasks();
      } else {
        throw new Error('task can not be added');
      }
    } catch (err) {
      console.log("error", err);
    }
  }

  const updateTask = async (id) => {
    try {
      const response = await api.put(`/tasks/${id}`);
      
      if(response.status === 200) {
        console.log('success!');
        getTasks();
      } else {
        throw new Error('task can not be updated');
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      
      if(response.status === 200) {
        console.log('success!');
        getTasks();
      } else {
        throw new Error('task can not be deleted');
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  // 앱이 켜졌을 때 실행. window.onload 비슷
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} deleteTask={deleteTask} updateTask={updateTask}/>
    </Container>
  );
}

export default TodoPage;
