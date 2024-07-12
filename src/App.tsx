import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Page404 from './components/Page404';
import LeftSide from './LeftSide';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<AppInside />} />
      <Route path="*" element={<Page404 />} />
    </Route>,
  ),
);

function AppInside() {
  return (
    <>
      <ErrorBoundary>
        <div className="app">
          <h1 className="text-center mt-2">Characters from Rick and Morty</h1>
          <LeftSide></LeftSide>
        </div>
      </ErrorBoundary>
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
