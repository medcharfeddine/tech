import { useState } from 'react';
import axios from 'axios';
// import { BASE_URL } from './config.jsx.old';

export default function RegisterPage({ switchToLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.username || !form.password) return alert("Please fill all fields");
    try {
      const res = await axios.post(`back-navy-gamma.vercel.app/api/auth/register`, form);
      alert(res.data.message || "Registered successfully");
      switchToLogin();
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div>
      <h2>Technician Register</h2>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} /><br/>
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} /><br/>
      <button onClick={submit}>Register</button>
      <p>
        Already have an account? <button onClick={switchToLogin}>Login</button>
      </p>
    </div>
  );
}
