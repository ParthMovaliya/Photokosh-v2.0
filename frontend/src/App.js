import React from 'react';
import './App.css';
import { Provider } from "react-redux"
import store from './store/store';
import MainRoute from './routes/MainRoute';

function App() {
  return (
    <div className='bg-[#f5f5f5] min-h-screen'>
      <Provider store={store}>
        <MainRoute />
      </Provider>
    </div>
  );
}

export default App;
