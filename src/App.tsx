import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppRoutes } from './routes';
import { Header } from './components/Header';
import { useLanguageStore } from './stores/languageStore';
import { EventService } from './lib/events/eventService';

function App() {
  const { language } = useLanguageStore();

  // Initialize app data
  useEffect(() => {
    EventService.getEvents();
  }, []);

  return (
    <Router>
      <div className={`min-h-screen bg-gray-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <Header />
        <AppRoutes />
        <Toaster 
          position={language === 'ar' ? 'top-left' : 'top-right'}
          containerStyle={{
            direction: language === 'ar' ? 'rtl' : 'ltr',
          }}
        />
      </div>
    </Router>
  );
}

export default App;