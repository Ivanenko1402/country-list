import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import './App.css';

import { HomePage } from './pages/HomePage';
import { TargetCountryPage } from './pages/TargetCountry';
import { UnknownPage } from './pages/UnknownPage';

import { Header } from './components/Header';
import { Footer } from './components/footer';

function App() {

  const GlobalContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    position: 'relative',
  });

  const ContentContainer = styled(Container)({
    marginBottom: '20px',
    minHeight: 'calc(100vh - 160px)',
  });

  return (
    <GlobalContainer>
      <Header />

      <ContentContainer>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/countries' element={<Navigate to='/' />} />
          <Route path='/countries/:id' element={<TargetCountryPage />} />
          <Route path='*' element={<UnknownPage />} />
        </Routes>
      </ContentContainer>

      <Footer />
    </GlobalContainer>
  );
}

export default App;
