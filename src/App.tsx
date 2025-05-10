import './App.scss';
// import { NormalCalendar } from './NormalCalendar';
import { Calendar } from './components/Calendar';

export const App = () => {
  return (
    <div style={{ height: '95vh', padding: '1rem' }}>
      <Calendar />
      {/* <NormalCalendar /> */}
    </div>
  );
};
