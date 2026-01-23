// import AdminReport from "./pages/AdminReport";


// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <AdminReport />
//     </div>
    
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminReport from "./pages/AdminReport";
import UsersList from "./pages/UsersList";
import SubscriptionPay from "./pages/SubscriptionPay";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminReport />} />
        <Route path="/users/:type" element={<UsersList />} />
        <Route path="/subscribe" element={<SubscriptionPay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


