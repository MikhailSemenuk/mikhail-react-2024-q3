import './App.css';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import Page404 from './components/Page404';
import LeftSide from './LeftSide';
// import { CharacterCardListPath } from './components/CharacterCardList';
import { fetchCharactersParams } from './libs/fetchCharacters';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Navigate to="/list/1" replace />} />
      <Route path="list" element={<LeftSide />} loader={fetchCharactersParams}>
        <Route path=":page" element={<LeftSide />}></Route>
      </Route>
      <Route path="*" element={<Page404 />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
