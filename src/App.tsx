import './App.css';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import Page404 from './components/Page404';
import LeftSide from './components/LeftSide';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Navigate to="/list/1" replace />} />
      <Route path="list" element={<LeftSide />}>
        <Route path=":page" element={<LeftSide />}></Route>
      </Route>
      <Route path="404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
