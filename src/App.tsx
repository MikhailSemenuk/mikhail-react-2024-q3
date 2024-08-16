import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Page404 from './components/Page404';
import ReactHookForm from './components/ReactHookForm';
import UncontrolledForm from './components/UncontrolledForm';
import Main from './components/Main';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Main />} />
      <Route path='ReactHookForm' element={<ReactHookForm />} />
      <Route path='UncontrolledForm' element={<UncontrolledForm />} />
      <Route path='404' element={<Page404 />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </>,
  ),
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
