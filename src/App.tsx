import './App.scss';
import { Calendar } from './components/Calendar';

export const App = () => {
  return (
    <div style={{ height: '95vh', padding: '1rem' }}>
      <Calendar />
    </div>
  );
};
