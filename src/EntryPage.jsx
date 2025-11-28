import { useState } from 'react';
import axios from 'axios';

const technicians = ["Ahmed","Mohamed","Youssef","Sami","Oussama"];

export default function EntryPage() {
  const [form, setForm] = useState({ client:'', phone:'', type:'', brand:'', sn:'', technician:'' });

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if(!form.sn || !form.client || !form.technician) {
      alert("Serial, client, and technician are required");
      return;
    }
    await axios.post('back-navy-gamma.vercel.app/api/machines', form);
    alert("Machine entered!");
    setForm({ client:'', phone:'', type:'', brand:'', sn:'', technician:'' });
  }

  return (
    <div>
      <h2>Enter Machine</h2>
      <input placeholder="Client" name="client" value={form.client} onChange={handleChange} /><br/>
      <input placeholder="Phone" name="phone" value={form.phone} onChange={handleChange} /><br/>
      <input placeholder="Type" name="type" value={form.type} onChange={handleChange} /><br/>
      <input placeholder="Brand" name="brand" value={form.brand} onChange={handleChange} /><br/>
      <input placeholder="Serial Number" name="sn" value={form.sn} onChange={handleChange} /><br/>
      <select name="technician" value={form.technician} onChange={handleChange}>
        <option value="">Select technician</option>
        {technicians.map(t => <option key={t}>{t}</option>)}
      </select><br/>
      <button onClick={submit}>Enter Machine</button>
    </div>
  );
}
