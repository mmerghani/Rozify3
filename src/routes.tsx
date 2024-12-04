import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { EventForm } from './components/EventForm';
import { EventPage } from './pages/EventPage';
import { AdminDashboard } from './pages/AdminDashboard';

export function AppRoutes() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-event" element={<EventForm />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </main>
  );
}