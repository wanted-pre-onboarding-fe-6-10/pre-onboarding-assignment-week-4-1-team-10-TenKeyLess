import { Provider } from 'react-redux';
import Router from './Router';
import { store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react'; // 📍
import { persistStore } from 'redux-persist'; // 📍

let persistor = persistStore(store); // 📍

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}

export default App;
