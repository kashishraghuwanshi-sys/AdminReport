
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminReport from "./pages/AdminReport";
import UsersList from "./pages/UsersList";
import SubscriptionPay from "./pages/SubscriptionPay";
import MessagesDetails from "./pages/MessagesDetails";
import { AdminReportProvider } from "./context/AdminReportContext";
import NotRenewedUsers from "./pages/NotRenewedUsers";

function App() {
  return (
    <BrowserRouter>
      <AdminReportProvider>
        <Routes>
          <Route path="/" element={<AdminReport />} />
          <Route path="/users/:type" element={<UsersList />} />
          <Route path="/subscribe" element={<SubscriptionPay />} />
          <Route path="/subscribe/not-renewed" element={<NotRenewedUsers />} />
          <Route path="/messages" element={<MessagesDetails />} />
           <Route path="/users/not-renewed" element={<NotRenewedUsers />} />
        </Routes>
      </AdminReportProvider>
    </BrowserRouter>
  );
}

export default App;

