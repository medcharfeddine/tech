import { useState } from 'react';
import axios from 'axios';

export default function LoginPage({ onLogin, switchToRegister }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      const res = await axios.post('back-navy-gamma.vercel.app/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      onLogin(res.data.username);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div>
      <h2>Technician Login</h2>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} /><br/>
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} /><br/>
      <button onClick={submit}>Login</button>
      <p>
        Don't have an account? <button onClick={switchToRegister}>Register</button>
      </p>
    </div>
  );
}
