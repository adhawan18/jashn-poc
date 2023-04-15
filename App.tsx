import React from 'react';
import { Provider} from 'react-redux';
import LoginScreen from './components/LoginScreen';
import store from './States/store';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

const App = () => (
  
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

export default App;





