import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Hexagon, Shield, Users, CheckCircle, Activity, ChevronLeft, 
  Lock, Globe, Zap, FileCheck, Search, Database 
} from 'lucide-react';

import Issuer from './components/Issuer';
import Verifier from './components/Verifier';
import Student from './components/Student';

function App() {
  const [view, setView] = useState('landing'); 

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1d1d1f] font-sans selection:bg-blue-100/50 relative overflow-x-hidden">
      
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 right-0 h-[80vh] bg-gradient-to-b from-white to-[#F5F5F7] -z-10" />
      <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[100px] -z-10" />
      <div className="fixed bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-purple-400/10 rounded-full blur-[100px] -z-10" />

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div onClick={() => setView('landing')} className="flex items-center gap-2 cursor-pointer group">
            <Hexagon size={20} className="text-black fill-black group-hover:rotate-12 transition-transform duration-500" />
            <span className="font-semibold tracking-tight text-lg">BlockCert</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-500">
            <button onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })} className="hover:text-black transition-colors">Features</button>
            <button onClick={() => document.getElementById('portals').scrollIntoView({ behavior: 'smooth' })} className="hover:text-black transition-colors">Portals</button>
            <button className="bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-800 transition-transform active:scale-95">Get Started</button>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="pt-32 pb-20 px-6">
        <AnimatePresence mode='wait'>
          
          {/* LANDING PAGE */}
          {view === 'landing' && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              {/* 1. HERO SECTION */}
              <section className="flex flex-col md:flex-row items-center gap-16 mb-32">
                {/* Left Text */}
                <div className="flex-1 space-y-8 text-center md:text-left">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-[11px] font-bold uppercase tracking-wider text-gray-500"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Sepolia Network Active
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.95]"
                  >
                    Verifiable <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600">Trust.</span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-gray-500 max-w-lg mx-auto md:mx-0 leading-relaxed"
                  >
                    The modern standard for academic credentials. Secured by Ethereum, stored on IPFS, verified in seconds.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-4 justify-center md:justify-start"
                  >
                    <button onClick={() => document.getElementById('portals').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-black text-white rounded-full font-medium text-lg hover:scale-105 transition-transform shadow-xl shadow-black/10">
                      Start Verification
                    </button>
                  </motion.div>
                </div>

                {/* Right Visual: "The Glass Stack" */}
                <motion.div 
                  className="flex-1 relative w-full h-[500px] flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", duration: 1.5 }}
                >
                  {/* Layer 1: Blockchain (Bottom) */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-72 h-72 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-[3rem] opacity-20 blur-3xl"
                  />
                  
                  {/* Layer 2: Glass Card (Back) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl shadow-2xl rotate-6 z-10 flex flex-col p-6">
                    <div className="h-4 w-1/3 bg-white/50 rounded-full mb-4" />
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-white/30 rounded-full" />
                      <div className="h-2 w-full bg-white/30 rounded-full" />
                      <div className="h-2 w-2/3 bg-white/30 rounded-full" />
                    </div>
                    <div className="mt-auto flex items-center gap-2 text-xs font-mono text-gray-500 opacity-60">
                      <Lock size={12} /> Encrypted on IPFS
                    </div>
                  </div>

                  {/* Layer 3: Main Card (Front) */}
                  <motion.div 
                    whileHover={{ scale: 1.02, rotate: -2 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] -rotate-3 z-20 p-8 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-6 text-white">
                        <Hexagon size={24} fill="white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 leading-tight">Credential<br/>Verified</h3>
                      <p className="text-sm text-gray-500 mt-2">Hash matched on Sepolia.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                        <div className="bg-green-500 rounded-full p-1 text-white">
                          <CheckCircle size={12} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-green-800">Authentic</p>
                          <p className="text-[10px] text-green-600">Timestamp: 2s ago</p>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 1, duration: 1.5 }}
                          className="h-full bg-black rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </section>

              {/* 2. FEATURES (Bento Grid) */}
              <section id="features" className="mb-32">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold tracking-tight">Powerful Integrity.</h2>
                  <p className="text-gray-500 mt-2">Built on the world's most secure decentralized protocols.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
                  {/* Feature 1: Large Box */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="md:col-span-2 bg-white rounded-[2rem] border border-white/50 shadow-sm p-10 flex flex-col justify-between relative overflow-hidden group"
                  >
                    <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700" />
                    <div>
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                        <Lock size={20} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Cryptographic Proof</h3>
                      <p className="text-gray-500 max-w-sm">Every document is hashed using SHA-256. Changing a single pixel alters the hash, triggering an immediate rejection by the smart contract.</p>
                    </div>
                  </motion.div>

                  {/* Feature 2: Tall Box */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-gray-900 rounded-[2rem] shadow-xl p-10 text-white flex flex-col justify-between relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <Hexagon size={40} className="text-gray-700" />
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Decentralized</h3>
                      <p className="text-gray-400 text-sm">Powered by IPFS & Ethereum Sepolia. Zero downtime, zero censorship.</p>
                    </div>
                  </motion.div>

                  {/* Feature 3: Small Box */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-[2rem] border border-white/50 shadow-sm p-8 flex flex-col justify-center items-center text-center"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                      <Zap size={24} />
                    </div>
                    <h3 className="text-lg font-bold">Instant</h3>
                    <p className="text-gray-500 text-sm">Verifications in &lt;2s.</p>
                  </motion.div>

                  {/* Feature 4: Small Box */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="md:col-span-2 bg-gradient-to-r from-white to-gray-50 rounded-[2rem] border border-white/50 shadow-sm p-10 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Global Standard</h3>
                      <p className="text-gray-500 max-w-xs">Universal compatibility with any EVM wallet.</p>
                    </div>
                    <Globe size={64} className="text-gray-200" />
                  </motion.div>
                </div>
              </section>

              {/* 3. PORTALS SECTION */}
              <section id="portals" className="mb-32">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 px-4">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">Enter the Ecosystem</h2>
                    <p className="text-gray-500 mt-2">Select your role to get started.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <PortalCard 
                    title="Issuer" 
                    desc="For Universities" 
                    icon={<Shield size={24} />} 
                    color="blue"
                    onClick={() => setView('issuer')}
                    features={["Upload Credentials", "Sign with Wallet", "Pin to IPFS"]}
                  />
                  <PortalCard 
                    title="Student" 
                    desc="For Graduates" 
                    icon={<Users size={24} />} 
                    color="purple"
                    onClick={() => setView('student')}
                    features={["View Wallet", "Share Links", "Verify History"]}
                  />
                  <PortalCard 
                    title="Verifier" 
                    desc="For Employers" 
                    icon={<CheckCircle size={24} />} 
                    color="green"
                    onClick={() => setView('verifier')}
                    features={["Instant Check", "Audit Logs", "Tamper Detection"]}
                  />
                </div>
              </section>

              {/* Footer */}
              <footer className="border-t border-gray-200 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center opacity-60 text-sm">
                  <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <Hexagon size={16} fill="black" />
                    <span className="font-bold">BlockCert</span>
                  </div>
                  <div className="flex gap-6">
                    <a href="#" className="hover:text-black">Privacy</a>
                    <a href="#" className="hover:text-black">Terms</a>
                    <a href="#" className="hover:text-black">GitHub</a>
                  </div>
                  <p>© 2025 Hackathon Build.</p>
                </div>
              </footer>

            </motion.div>
          )}

          {/* --- ACTIVE PORTAL VIEW --- */}
          {view !== 'landing' && (
            <motion.div
              key="portal"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="min-h-screen"
            >
              <div className="max-w-4xl mx-auto px-6 py-12">
                <button 
                  onClick={() => setView('landing')} 
                  className="group flex items-center text-sm font-medium text-gray-500 hover:text-black mb-8 transition-colors"
                >
                  <div className="bg-white p-2 rounded-full shadow-sm border border-gray-100 mr-3 group-hover:scale-110 transition-transform">
                    <ChevronLeft size={16} />
                  </div>
                  Back to Hub
                </button>
                
                {/* The Glass Container for the Component */}
                <div className="bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
                  {/* Decorative gradient for active view */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30" />
                  
                  {view === 'issuer' && <Issuer />}
                  {view === 'verifier' && <Verifier />}
                  {view === 'student' && <Student />}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function PortalCard({ title, desc, icon, onClick, color, features }) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-white rounded-[2rem] p-8 border border-white/50 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 cursor-pointer group relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${colorStyles[color]} transition-transform group-hover:scale-110 duration-300`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-6">{desc}</p>
        
        {/* Mini Feature List */}
        <div className="space-y-2 mb-8">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-1 h-1 rounded-full bg-gray-300" /> {f}
            </div>
          ))}
        </div>

        <div className="flex items-center font-bold text-sm text-gray-900 group-hover:translate-x-1 transition-transform">
          Open Portal <ArrowRight size={16} className="ml-2" />
        </div>
      </div>
      
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0" />
    </motion.div>
  );
}

export default App;