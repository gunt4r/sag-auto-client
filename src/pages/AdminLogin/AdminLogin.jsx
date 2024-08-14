import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classNames from "classnames"
import style from "./styleAdminLogin.module.css"
const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password,
      });
      localStorage.setItem('adminToken', response.data);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error(error);
    }
  };
  return <section className={classNames(style['section-login'])}>
   <h2 className={classNames(style['section-login__header'])}>Login pentru administrator</h2>
      <form className={classNames(style['section-login__form'])} onSubmit={handleSubmit}>
        <input className={classNames(style['section-login__form-input'])}
          type="text"
          placeholder="Login"
          value={username}
          onInput={(e) => setUsername(e.target.value)}
          required
        />
        <input className={classNames(style['section-login__form-input'])}
          type="password"
          placeholder="Parola"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
          required
        />
        <button className='btn-outline-dark btn' type="submit">Continuă</button>
      </form>
  </section>;
};

export default AdminLogin;