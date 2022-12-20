import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectedRoute from 'utils/ProtectedRoute';
import { loginInputs, productInputs, userInputs } from 'formData';
import { useGlobalContext } from 'context/darkmode/DarkModeContext';
import {
  Home,
  Layout,
  List,
  Login,
  New,
  NotFound,
  SharedLayout,
  Single,
} from 'pages';

import './style/dark.scss';

function App() {
  const { darkMode } = useGlobalContext();

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Router>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path='login' element={<Login inputs={loginInputs} />} />
            <Route path='users' element={<Layout />}>
              <Route index
                element={
                  <ProtectedRoute>
                    <List />
                  </ProtectedRoute>
                }
              />
              <Route path=':userId'
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path='new'
                element={<New inputs={userInputs} title='Add new user' />}
              />
            </Route>
            <Route path='products' element={<Layout />}>
              <Route index
                element={
                  <ProtectedRoute>
                    <List />
                  </ProtectedRoute>
                }
              />
              <Route path=':productId' element={<Single />} />
              <Route
                path='new'
                element={
                  <ProtectedRoute>
                    <New inputs={productInputs} title='Add new product' />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
