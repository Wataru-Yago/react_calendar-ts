import React from 'react';
import Calendar from './components/Calendar';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>日程調整カレンダー</h1>
      <Calendar />
    </div>
  );
};

export default App;
