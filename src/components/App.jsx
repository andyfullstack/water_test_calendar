import { Calendar } from './Calendar/Month/Month';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';

export const App = () => {
  return (
    <div>
      <Provider store={(store, persistor)}>
        <Calendar />
      </Provider>
    </div>
  );
};
