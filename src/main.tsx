import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainProvider from './MainProvider';
import settings from './app/settings';
import './index.css';
import Layout from './layout/Layout';
import Nopage from './pages/404';
import Tokenization from './pages/Tokenization';
import Todo from './pages/todo/page';
import store from './redux/store';


//main dom element selector
const main_dom = import.meta.env.VITE_MAIN_DOM || '%VITE_MAIN_DOM%';

//application render
ReactDOM.createRoot(document.getElementById(main_dom)!).render(
  <React.StrictMode>
    <BrowserRouter basename={settings.basename}>
      <Provider store={store} >
        <MainProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Todo />} />
              <Route path='/tokenization' element={<Tokenization />} />
            </Route>
            <Route path="/*" element={<Nopage />} />
          </Routes>
        </MainProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
