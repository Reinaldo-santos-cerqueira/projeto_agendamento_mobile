import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from '@redux';
import {Router} from '@routes';

function App(): React.ReactNode {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <Router />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
