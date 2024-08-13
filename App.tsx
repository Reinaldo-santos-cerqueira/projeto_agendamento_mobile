import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from '@redux';
import {Router} from '@routes';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

function App(): React.ReactNode {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Router />
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
