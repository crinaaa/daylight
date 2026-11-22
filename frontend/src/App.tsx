import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import { useState } from 'react'
import type { Page } from './types/navigations'


function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard');

  return (
    <div className='app-layout'>
        <Sidebar 
          activePage={activePage}
          onNavigate={setActivePage}
        />

        <main className='dashboard'>
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'journal' && <h1>My Journal</h1>}
          {activePage === 'calendar' && <h1>My Calendar</h1>}
          {activePage === 'progress' && <h1>My Progress</h1>}
        </main>
    </div>
  );
}

export default App
