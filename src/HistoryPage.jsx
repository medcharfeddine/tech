import { useEffect, useState } from 'react';
import axios from 'axios';

const technicians = ["","Ahmed","Mohamed","Youssef","Sami","Oussama"];
const statuses = ["","In","Out"];

export default function HistoryPage() {
  const [machines, setMachines] = useState([]);
  const [filterTech, setFilterTech] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const fetchData = async () => {
    const res = await axios.get('back-navy-gamma.vercel.app/api/machines', {
      params: { technician: filterTech || undefined, status: filterStatus || undefined }
    });
    setMachines(res.data);
  }

  useEffect(() => { fetchData(); }, [filterTech, filterStatus]);

  const markExit = async id => {
    await axios.put(`back-navy-gamma.vercel.app/api/machines/${id}/exit`);
    fetchData();
  }

  const addRepair = async id => {
    const note = prompt("Repair done:");
    const tech = prompt("Technician (optional):");
    if(note){
      await axios.post(`back-navy-gamma.vercel.app/api/machines/${id}/repair`, { note, tech });
      fetchData();
    }
  }

  return (
    <div>
      <h2>Machine History</h2>
      <label>Technician:</label>
      <select value={filterTech} onChange={e=>setFilterTech(e.target.value)}>
        {technicians.map(t => <option key={t} value={t}>{t || "All"}</option>)}
      </select>
      <label>Status:</label>
      <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
        {statuses.map(s => <option key={s} value={s}>{s || "All"}</option>)}
      </select>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>SN</th><th>Client</th><th>Phone</th><th>Type</th><th>Brand</th>
            <th>Technician</th><th>Status</th><th>Entry</th><th>Exit</th><th>Repairs</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {machines.map(m=>(
            <tr key={m._id}>
              <td>{m.sn}</td><td>{m.client}</td><td>{m.phone}</td><td>{m.type}</td><td>{m.brand}</td>
              <td>{m.technician}</td><td>{m.status}</td>
              <td>{new Date(m.entry).toLocaleString()}</td>
              <td>{m.exit ? new Date(m.exit).toLocaleString() : ""}</td>
              <td>
                <ul>{m.repairs.map((r,i)=><li key={i}>{new Date(r.date).toLocaleString()}: {r.note} ({r.tech})</li>)}</ul>
              </td>
              <td>
                {m.status==="In" && <button onClick={()=>markExit(m._id)}>Exit</button>}
                <button onClick={()=>addRepair(m._id)}>Add Repair</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
