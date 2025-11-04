
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import RegistrationForm from './components/RegistrationForm';
import LogoIcon from './components/icons/LogoIcon';

function App() {
  const [showRegistration, setShowRegistration] = useState(false);

  const handleShowRegistration = () => setShowRegistration(true);
  const handleShowLanding = () => setShowRegistration(false);

  return (
    <>
      {showRegistration ? (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white animate-fade-in">
          <div className="w-full max-w-md">
            <header className="text-center mb-8">
                <a href="#" onClick={(e) => { e.preventDefault(); handleShowLanding(); }} className="inline-flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900 transition-colors">
                  <LogoIcon className="h-8 w-auto" />
                  <span className="font-bold text-xl tracking-tight">Apex Career Learning</span>
                </a>

            </header>
            <main>
              <RegistrationForm onBack={handleShowLanding} />
            </main>
            <footer className="text-center mt-8 text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Apex Career Learning. All rights reserved.</p>
            </footer>
          </div>
        </div>
      ) : (
        <LandingPage onGetStarted={handleShowRegistration} />
      )}
    </>
  );
}

export default App;
