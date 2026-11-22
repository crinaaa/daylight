import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import { useState } from 'react'
import type { Page } from './types/navigations'
import Journal from './pages/Journal'
import type { JournalEntry } from './types/journal'


function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  function handleSaveEntry(entry: JournalEntry) {
      setEntries((previousEntries) => [
      entry,
      ...previousEntries,
    ]);
  }

  return (
    <div className='app-layout'>
        <Sidebar 
          activePage={activePage}
          onNavigate={setActivePage}
        />

        <main className='dashboard'>
          {activePage === 'dashboard' && 
          (<Dashboard
            onWriteEntry={() => setActivePage('journal')}  
          />
          )}
          
          {activePage === 'journal' && (
          <Journal
            entries={entries}
            onSave={handleSaveEntry}
          />
        )}

          {activePage === 'calendar' && <h1>My Calendar</h1>}
          {activePage === 'progress' && <h1>My Progress</h1>}
        </main>

  
    </div>
  );
}

export default App
