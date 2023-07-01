import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header';
import './app.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  return (
    <div>
      <Header />
    </div>
  );
};
root.render(<App />);
