

// import React, { useEffect, useState } from "react";
// import UserActivityTable from "../components/UserActivityTable";
// import { useLocation } from "react-router-dom";
// import BackButton from "../components/BackButton";
// import { fetchNotRenewedUsers } from "../api/adminReport.api";

// const SubscriptionPay = () => {
//   const { state } = useLocation();
//   const tableData = state?.val ?? [];

//   const [expiredCount, setExpiredCount] = useState(
//     typeof state?.expired_not_renewed === "number" ? state.expired_not_renewed : 0
//   );
//   const [countLoading, setCountLoading] = useState(true);

//   useEffect(() => {
//     const fetchExpiredCount = async () => {
//       try {
//         setCountLoading(true);
//         const res = await fetchNotRenewedUsers(); // { data: [...] }
//         const list = res?.data || [];
//         setExpiredCount(list.length);
//       } catch (e) {
//         console.error("Failed to fetch not-renewed count:", e);
//       } finally {
//         setCountLoading(false);
//       }
//     };

//     fetchExpiredCount();
//   }, []);

//   return (
//     <div className="mt-10">
//       <div className="mb-4">
//         <BackButton fallback="/" label="← Back" />
//       </div>

//       <h2 className="text-xl font-bold mb-1">User Plan & Payment Activity</h2>

//       <p className="text-gray-700 font-semibold mb-4">
//         Expired (Not Renewed): {countLoading ? "Loading..." : expiredCount}
//       </p>

//       <UserActivityTable data={tableData} />
//     </div>
//   );
// };

// export default SubscriptionPay;


import React, { useEffect, useState } from "react";
import UserActivityTable from "../components/UserActivityTable";
import { useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";
import { fetchNotRenewedUsers } from "../api/adminReport.api";
import { useAdminReport } from "../context/AdminReportContext";

const SubscriptionPay = () => {
  const { state } = useLocation();
  const tableData = state?.val ?? [];

  const { fromDate, toDate } = useAdminReport();

  const [expiredCount, setExpiredCount] = useState(0);
  const [countLoading, setCountLoading] = useState(true);

  useEffect(() => {
    const fetchExpiredCount = async () => {
      try {
        setCountLoading(true);
        const res = await fetchNotRenewedUsers(fromDate, toDate);
        const list = res?.data || [];
        setExpiredCount(list.length);
      } catch (e) {
        console.error("Failed to fetch not-renewed count:", e);
        setExpiredCount(0);
      } finally {
        setCountLoading(false);
      }
    };

    fetchExpiredCount();
  }, [fromDate, toDate]);

  return (
    <div className="mt-10">
      <div className="mb-4">
        <BackButton fallback="/" label="← Back" />
      </div>

      <h2 className="text-xl font-bold mb-1">User Plan & Payment Activity</h2>

      <p className="text-gray-700 font-semibold mb-4">
        Expired (Not Renewed): {countLoading ? "Loading..." : expiredCount}
      </p>

      <UserActivityTable data={tableData} />
    </div>
  );
};

export default SubscriptionPay;