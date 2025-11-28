import { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import EntryPage from './EntryPage';
import HistoryPage from './HistoryPage';

function App() {
  const [user, setUser] = useState(localStorage.getItem('username') || null);
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return showRegister 
      ? <RegisterPage switchToLogin={() => setShowRegister(false)} /> 
      : <LoginPage onLogin={setUser} switchToRegister={() => setShowRegister(true)} />;
  }

  return (
    <div>
      <h3>Welcome, {user}</h3>
      <button onClick={() => { localStorage.clear(); window.location.reload(); }}>Logout</button>
      <EntryPage loggedInUser={user} />
      <HistoryPage />
    </div>
  );
}

export default App;
