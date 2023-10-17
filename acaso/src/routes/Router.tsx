import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignupPage from '../pages/SignupPage';
import ConfirmationPage from '../pages/ConfirmationPage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/confirmation-email" element={<ConfirmationPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Defina a rota padrão usando * */}
        <Route path="*" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
