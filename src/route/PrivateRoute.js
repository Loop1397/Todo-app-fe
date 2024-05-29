import React from 'react';
import { Navigate } from "react-router-dom";

// 토큰의 유무에 따라 특정 url의 접근을 막거나 리다이렉트하기위해 만든 파일

/**
 *  children : 리액트의 컴포넌트와 관련된 인자.
 * 본 컴포넌트가 호출 될 때, 컴포넌트의 아래에 자식 컴포넌트가 있으면 children 인자를 쓰는 것으로 해당 컴포넌트의 정보를 자동으로 가져올 수 있음.
 *  예를들어 App.js에서 
 *      <PrivateRoute user = {user}>
          <TodoPage />
        </PrivateRoute>
        처럼 사용할 경우, children은 <TodoPage />가 됨
 * */ 
const PrivateRoute = ({user, children}) => {
    // user값이 존재하면 Todopage, 없으면 /login으로 리다이렉트
    return user ? children : <Navigate to='/login/' />;
}

export default PrivateRoute;