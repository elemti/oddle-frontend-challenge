import React from 'react';
import './App.css';
import { MainSearch } from './features/mainSearch/MainSearch';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <MainLayout>
      <MainSearch />
    </MainLayout>
  );
}

export default App;
