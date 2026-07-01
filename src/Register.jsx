import React, { useState } from 'react';

export default function Register() {
  // 1. 입력 필드의 상태(State) 통합 관리
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  // 2. 에러 메시지 상태 관리
  const [errors, setErrors] = useState({});
  // 3. 가입 성공 완료 메시지 상태 관리
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 입력 값이 바뀔 때마다 실행되는 핸들러 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // 이메일, 비밀번호 등 변경된 필드만 갱신
    });
  };

  // 유효성 검사 함수
  const validateForm = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자리 이상이어야 합니다.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    return newErrors;
  };

  // 폼 제출(Submit) 핸들러 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 새로고침 방지
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      // 에러가 없다면 백엔드 API 호출 등 가입 처리 진행
      console.log('서버로 전송할 데이터:', formData);
      setIsSubmitted(true);
      setErrors({});
    } else {
      // 에러가 있다면 화면에 표시
      setErrors(formErrors);
      setIsSubmitted(false);
    }
  };

  // 가입 완료 성공 화면
  if (isSubmitted) {
    return (
      <div style={styles.card}>
        <h2 style={{ color: '#2ecc71', textAlign: 'center' }}>🎉 회원가입 성공!</h2>
        <p style={{ textAlign: 'center' }}>{formData.name}님, 환영합니다.</p>
        <button 
          style={styles.button} 
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ email: '', password: '', confirmPassword: '', name: '' });
          }}
        >
          처음으로 돌아가기
        </button>
      </div>
    );
  }

  // 기본 회원가입 폼 화면
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>회원가입</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        
        {/* 이름 입력 필드 */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            placeholder="홍길동"
          />
          {errors.name && <span style={styles.errorText}>{errors.name}</span>}
        </div>

        {/* 이메일 입력 필드 */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>이메일 주소</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            placeholder="example@email.com"
          />
          {errors.email && <span style={styles.errorText}>{errors.email}</span>}
        </div>

        {/* 비밀번호 입력 필드 */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            placeholder="6자리 이상 입력"
          />
          {errors.password && <span style={styles.errorText}>{errors.password}</span>}
        </div>

        {/* 비밀번호 확인 입력 필드 */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
            placeholder="비밀번호 재입력"
          />
          {errors.confirmPassword && <span style={styles.errorText}>{errors.confirmPassword}</span>}
        </div>

        <button type="submit" style={styles.button}>가입하기</button>
      </form>
    </div>
  );
}

// 회원가입 전용 디자인 스타일
const styles = {
  card: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '30px',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    fontFamily: 'sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#555',
  },
  input: {
    padding: '10px 12px',
    fontSize: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    marginTop: '10px',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  errorText: {
    fontSize: '12px',
    color: '#e74c3c',
    marginTop: '2px',
  },
};
