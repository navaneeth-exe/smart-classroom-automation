import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { ClassroomPage } from './pages/ClassroomPage';
import { ControlsPage } from './pages/ControlsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PresentationPage } from './pages/PresentationPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="classroom" element={<ClassroomPage />} />
          <Route path="controls" element={<ControlsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="presentation" element={<PresentationPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
