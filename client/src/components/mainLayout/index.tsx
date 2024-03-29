import Loading from 'components/loading';
import { routes, TRoles } from 'components/mainLayout/routes';
import { LocalStorageName, RouteBasePath } from 'constants/index';
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
    const accessToken = getLocalStorageItem(LocalStorageName.ACCESS_TOKEN_NAME);
    if (accessToken) dispatch(getAuthThunk());
  });

  const handleGenerateRouteElement = (requiredRole: TRoles[], path: string, element: ReactElement) => {
    if (pathname === RouteBasePath.LOGIN_BASE_PATH || path === `${RouteBasePath.LOGIN_BASE_PATH}/${RouteBasePath.REGISTER_PAGE_BASE_PATH}`) {
      return userData ? <Navigate to='/' /> : element;
    }
    const accessToken = getLocalStorageItem(LocalStorageName.ACCESS_TOKEN_NAME);
    if (requiredRole?.length) {
      if (userData && accessToken) {
        return requiredRole.find((role) => userData.role.includes(role)) ? element : <Navigate to={RouteBasePath.PAGE_NOT_FOUND} />;
      } else {
        return <Navigate to={RouteBasePath.LOGIN_BASE_PATH} state={{ from: pathname }} />;
      }
    }

    return element;
  };

  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={handleGenerateRouteElement(route.requiredRole, route.path, route.element)}>
            {route.children.length ? (
              route.children.map((child) => (
                <Route
                  key={child.path}
                  index={child.isIndex}
                  path={child.path}
                  element={handleGenerateRouteElement(child.requiredRole, child.path, child.element)}
                />
              ))
            ) : (
              <></>
            )}
          </Route>
        ))}
      </Routes>
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </>
  );
};

export default MainLayout;
