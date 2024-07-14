import './App.css';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import Page404 from './components/Page404';
import Main from './components/Main';
import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Navigate to="/list/1" replace />} />
      <Route path="list/:page" element={<Main />}></Route>
      <Route path="404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Route>,
  ),
);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
