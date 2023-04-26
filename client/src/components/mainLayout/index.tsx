import { routes } from 'components/mainLayout/routes';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children.length ? (
            route.children.map((child) => <Route key={child.path} index={child.isIndex} path={child.path} element={child.element} />)
          ) : (
            <></>
          )}
        </Route>
      ))}
    </Routes>
  );
};

export default MainLayout;
