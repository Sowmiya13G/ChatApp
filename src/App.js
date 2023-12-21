import React from 'react';

// Redux
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';

import AppNavigator from './navigation/AppNavigator';
import {ThemeProvider} from './utils/themeContext';

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
