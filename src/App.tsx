import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import NavBar from './components/NavBar';
import { RouteNames } from './types/routeNames';
import SearchPage from './pages/Search';

function App() {

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path={RouteNames.HOME}
          element={<Home />}
        />
        <Route
          path={RouteNames.FAVORITES}
          element={<Favorites />}
        />
        <Route
          path={RouteNames.SEARCH}
          element={<SearchPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
