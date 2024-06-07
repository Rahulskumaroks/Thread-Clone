// app.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Navigations/Main';
import Auth from './Navigations/Auth';
import Store, { AppDispatch, RootState } from './redux/Store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/actions/userAction';
import Loader from './src/common/Loader';
import { LogBox } from 'react-native';
import { StatusBar } from 'native-base';

LogBox.ignoreAllLogs();

function App() {
  return (
    <Provider store={Store}>
      <AppStack />
    </Provider>
  );
}

const AppStack = () => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.user); // Use RootState type
  const dispatch: AppDispatch = useDispatch(); // Initialize dispatch with AppDispatch type

  React.useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={'#fff'}
        barStyle={'dark-content'}
        showHideTransition={'fade'}
      />
      {loading ? (
        <Loader />
      ) : (
        <NavigationContainer>
          {isAuthenticated ? <Main /> : <Auth />}
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
