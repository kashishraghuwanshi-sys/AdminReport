import React, { useEffect, useState } from "react";
import UserActivityTable from "../components/UserActivityTable";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SubscriptionPay = () => {
  const { state } = useLocation();

  const tableData = state?.val ?? [];

  // state se agar aa raha ho to initial set, warna 0
  const [expiredCount, setExpiredCount] = useState(
    typeof state?.expired_not_renewed === "number" ? state.expired_not_renewed : 0
  );
  const [countLoading, setCountLoading] = useState(true);

  // ✅ Always fetch correct count from backend (so 0 issue fix ho jaye)
  useEffect(() => {
    const fetchExpiredCount = async () => {
      try {
        setCountLoading(true);
        const res = await axios.get(
          "http://localhost:5000/api/admin/reports/not-renewed"
        );
        const list = res.data?.data || [];
        setExpiredCount(list.length);
      } catch (e) {
        console.error("Failed to fetch not-renewed count:", e);
        // fallback: state wala count hi rehne do
      } finally {
        setCountLoading(false);
      }
    };

    fetchExpiredCount();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-1">User Plan & Payment Activity</h2>

      {/* ✅ Button removed; only count text */}
      <p className="text-gray-700 font-semibold mb-4">
        Expired (Not Renewed):{" "}
        {countLoading ? "Loading..." : expiredCount}
      </p>

      <UserActivityTable data={tableData} />
    </div>
  );
};

export default SubscriptionPay;