import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectedRoute from 'utils/ProtectedRoute';
import { hotelColumns, roomColumns, userColumns } from 'data';
import { useGlobalContext } from 'context/darkmode/DarkModeContext';
import { hotelInputs, loginInputs, roomInputs, userInputs } from 'formData';
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
                    <List columns={userColumns} />
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
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title='Add new user' />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='hotels' element={<Layout />}>
              <Route index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route path=':hotelId' element={<Single />} />
              <Route
                path='new'
                element={
                  <ProtectedRoute>
                    <New inputs={hotelInputs} title='Add new hotel' />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='rooms' element={<Layout />}>
              <Route index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route path=':roomId' element={<Single />} />
              <Route
                path='new'
                element={
                  <ProtectedRoute>
                    <New inputs={roomInputs} title='Add new room' />
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
