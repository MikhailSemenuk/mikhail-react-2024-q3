import './App.css';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import Page404 from './components/Page404';
import LeftSide from './components/LeftSide';
import ErrorBoundary from './components/ErrorBoundary';
// import { DetailCharacterCard } from './components/DetailCharacterCard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Navigate to="/list/1" replace />} />
      <Route path="list/:page" element={<LeftSide />}>
        {/* <Route path="details" element={<DetailCharacterCard character={undefined} />} /> */}
      </Route>
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
