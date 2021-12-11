import React, { useContext, Suspense } from 'react';
import { Logo } from './components/Logo';
import { GlobalStyle } from './styles/GlobalStyles';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from './components/NavBar';
// import { Favs } from './pages/Favs';
// import { Home } from './pages/Home';
// import { Detail } from './pages/Detail';
// import { User } from './pages/User';
// import { NotRegisteredUser } from './pages/NotRegisteredUser';
// import { NotFound } from './pages/NotFound';

import { UserContext } from './Context';

const Favs = React.lazy(() => import('./pages/Favs'));
const Home = React.lazy(() => import('./pages/Home'));
const Detail = React.lazy(() => import('./pages/Detail'));
const User = React.lazy(() => import('./pages/User'));
const NotRegisteredUser = React.lazy(() => import('./pages/NotRegisteredUser'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

export const App = () => {
  const { isAuth } = useContext(UserContext);

  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <GlobalStyle />
        <Logo />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/pet/:categoryId" element={<Home />} />
          <Route exact path="/detail/:detailId" element={<Detail />} />
          <Route
            exact
            path="/favs"
            element={isAuth ? <Favs /> : <Navigate replace to="/login" />}
          />
          <Route
            exact
            path="/user"
            element={isAuth ? <User /> : <Navigate replace to="/login" />}
          />
          <Route
            exact
            path="/login"
            element={
              !isAuth ? <NotRegisteredUser /> : <Navigate replace to="/" />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <NavBar />
      </BrowserRouter>
    </Suspense>
  );
};
