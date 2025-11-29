import { useState } from 'react';
import { ArrowRight, CheckCircle, Shield, FileText, Users, Activity } from 'lucide-react';
import Issuer from './components/Issuer';
import Verifier from './components/Verifier';
import Student from './components/Student'; // <--- 1. Import the Student Component

function App() {
  const [view, setView] = useState('landing'); // landing, issuer, verifier, student

  const goHome = () => setView('landing');

  // --- 2. Add the Student Route ---
  if (view === 'student') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar goHome={goHome} />
        <div className="max-w-4xl mx-auto pt-10 px-4">
          <button onClick={goHome} className="mb-4 text-gray-500 hover:text-gray-900 flex items-center">
             ← Back to Home
          </button>
          <Student />
        </div>
      </div>
    );
  }

  if (view === 'issuer') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar goHome={goHome} />
        <div className="max-w-4xl mx-auto pt-10 px-4">
          <button onClick={goHome} className="mb-4 text-gray-500 hover:text-gray-900 flex items-center">
             ← Back to Home
          </button>
          <Issuer />
        </div>
      </div>
    );
  }

  if (view === 'verifier') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar goHome={goHome} />
        <div className="max-w-4xl mx-auto pt-10 px-4">
          <button onClick={goHome} className="mb-4 text-gray-500 hover:text-gray-900 flex items-center">
             ← Back to Home
          </button>
          <Verifier />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar goHome={goHome} />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-100">
            <CheckCircle size={16} className="mr-2" />
            Trusted by 500+ institutions worldwide
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Trustworthy verification for academic records.
          </h1>
          <p className="text-lg text-gray-600 max-w-lg">
            BlockCert connects universities, students, and employers with a modern verification workflow — fast, auditable, and secure.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button onClick={() => document.getElementById('portals').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition shadow-lg hover:shadow-xl">
              Get Started
            </button>
          </div>
        </div>

        {/* Visual Mockup */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-teal-100 rounded-2xl blur opacity-30"></div>
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-lg">University Dashboard</h3>
                <p className="text-xs text-gray-500">St. Elias University • Registrar</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold flex items-center">● Live</span>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Verification Queue</span>
                  <span className="font-bold text-gray-900">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTAL SELECTION */}
      <section id="portals" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Select Your Portal</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tailored interfaces for every stakeholder in the verification ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PortalCard 
              icon={<Shield size={32} className="text-blue-600" />}
              title="Issuer"
              subtitle="Universities & Institutions"
              features={['Issue Certificates', 'Manage Records']}
              action={() => setView('issuer')}
            />

            {/* --- 3. Activate the Student Button --- */}
            <PortalCard 
              icon={<Users size={32} className="text-purple-600" />}
              title="Student"
              subtitle="Graduates & Learners"
              features={['View Credentials', 'Share Profile']}
              action={() => setView('student')} 
            />

            <PortalCard 
              icon={<CheckCircle size={32} className="text-green-600" />}
              title="Verifier"
              subtitle="Employers & Agencies"
              features={['Verify Hash', 'Check Validity']}
              action={() => setView('verifier')}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Helpers
function Navbar({ goHome }) {
  return (
    <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div onClick={goHome} className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold">B</div>
          <span className="font-bold text-xl tracking-tight">BlockCert</span>
        </div>
      </div>
    </nav>
  );
}

function PortalCard({ icon, title, subtitle, features, action }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
      <div className="mb-6 p-3 bg-gray-50 rounded-xl w-fit group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-6">{subtitle}</p>
      <button onClick={action} className="w-full py-3 px-4 rounded-xl border border-gray-200 font-semibold text-gray-700 hover:border-gray-900 hover:text-gray-900 transition flex items-center justify-center gap-2">
        Enter Dashboard <ArrowRight size={16} />
      </button>
    </div>
  );
}

export default App;