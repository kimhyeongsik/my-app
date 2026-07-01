import React from 'react';
import Register from './Register'; // 1단계에서 만든 파일 불러오기

function App() {
  return (
    <div className="App">
      {/* 화면에 회원가입 컴포넌트 렌더링 */}
      <Register />
    </div>
  );
}

export default App;