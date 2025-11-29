import { useState } from 'react';
// We will create these components next!
import Issuer from './components/Issuer';
import Verifier from './components/verifier';

function App() {
  const [view, setView] = useState('verifier'); // Default to Verifier view

  return (
    <div className="min-h-screen font-sans text-gray-900">
      
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">BlockCert</h1>
          <div className="space-x-4">
            <button 
              onClick={() => setView('issuer')}
              className={`px-4 py-2 rounded-md transition-colors ${view === 'issuer' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-600 hover:text-blue-500'}`}
            >
              Organization Portal
            </button>
            <button 
              onClick={() => setView('verifier')}
              className={`px-4 py-2 rounded-md transition-colors ${view === 'verifier' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-600 hover:text-blue-500'}`}
            >
              Verifier Portal
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto mt-10 p-6">
        {view === 'issuer' ? <Issuer /> : <Verifier />}
      </main>

    </div>
  );
}

export default App;