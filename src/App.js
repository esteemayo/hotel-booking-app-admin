import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthRoute from 'utils/AuthRoute';
import ProtectedRoute from 'utils/ProtectedRoute';
import { hotelColumns, roomColumns, userColumns } from 'data';
import { loginInputs, updateUserInputs, userInputs } from 'formData';
import { useGlobalContext } from 'context/darkmode/DarkModeContext';
import {
  Home,
  HotelFormComponent,
  Layout,
  List,
  Login,
  NewHotel,
  NewRoom,
  NewUser,
  NotFound,
  SharedLayout,
  SingleHotel,
  SingleRoom,
  SingleUser,
  UpdateUser,
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
            <Route path='login'
              element={
                <AuthRoute>
                  <Login inputs={loginInputs} />
                </AuthRoute>
              }
            />
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
                    <SingleUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path='new'
                element={
                  <ProtectedRoute>
                    <NewUser inputs={userInputs} title='Add new user' />
                  </ProtectedRoute>
                }
              />
              <Route path=':userId/update'
                element={
                  <ProtectedRoute>
                    <UpdateUser inputs={updateUserInputs} />
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
              <Route path=':hotelId' element={<SingleHotel />} />
              <Route
                path='new'
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
              <Route
                path=':slug/update'
                element={
                  <ProtectedRoute>
                    <HotelFormComponent />
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
              <Route path=':roomId' element={<SingleRoom />} />
              <Route
                path='new'
                element={
                  <ProtectedRoute>
                    <NewRoom />
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
