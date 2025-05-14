import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Calendar, Layout } from "./components/";
import "./App.scss";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>Coming soon...</div>} />
          <Route path="dashboard" element={<div>Coming soon...</div>} />
          <Route path="inbox" element={<div>Coming soon...</div>} />
          <Route path="products" element={<div>Coming soon...</div>} />
          <Route path="invoices" element={<div>Coming soon...</div>} />
          <Route path="customers" element={<div>Coming soon...</div>} />
          <Route path="chat" element={<div>Coming soon...</div>} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="help" element={<div>Coming soon...</div>} />
          <Route path="settings" element={<div>Coming soon...</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
