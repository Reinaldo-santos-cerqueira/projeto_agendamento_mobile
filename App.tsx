import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from '@redux';
import {Router} from '@routes';

function App(): React.ReactNode {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Router />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
