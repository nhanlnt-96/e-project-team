import Loading from 'components/loading';
import { routes, TRoles } from 'components/mainLayout/routes';
import { LocalStorageName, RouteBasePath } from 'constants/index';
import { AuthContext } from 'context/index';
import { useEffectOnce } from 'hooks/useEffectOnce';
import React, { ReactElement } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { getAuthThunk } from 'redux/authenticate/getAuthSlice';
import { getAuthSelector } from 'redux/authenticate/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getLocalStorageItem } from 'utils/localStorage';

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { userData, isLoading } = useAppSelector(getAuthSelector);

  useEffectOnce(() => {
    dispatch(getAuthThunk());
  });

  const handleGenerateRouteElement = (isPrivate: boolean, requiredRole: TRoles | undefined, path: string, element: ReactElement) => {
    if (path === RouteBasePath.LOGIN_BASE_PATH) {
      return userData ? <Navigate to='/' /> : element;
    }
    if (isPrivate) {
      const accessToken = getLocalStorageItem(LocalStorageName.ACCESS_TOKEN_NAME);
      if (requiredRole) {
        return userData && accessToken && userData.role.includes(requiredRole) ? element : <Navigate to={RouteBasePath.PAGE_NOT_FOUND} />;
      }

      return userData && accessToken ? element : <Navigate to={RouteBasePath.LOGIN_BASE_PATH} state={{ from: pathname }} />;
    }

    return element;
  };

  return (
    <AuthContext.Provider value={{ userData }}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={handleGenerateRouteElement(route.isPrivate, route.requiredRole, route.path, route.element)}
          >
            {route.children.length ? (
              route.children.map((child) => <Route key={child.path} index={child.isIndex} path={child.path} element={child.element} />)
            ) : (
              <></>
            )}
          </Route>
        ))}
      </Routes>
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </AuthContext.Provider>
  );
};

export default MainLayout;
