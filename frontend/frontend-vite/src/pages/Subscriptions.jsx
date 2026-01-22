import { useEffect, useState } from "react";
import axios from "axios";

const Subscriptions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/subscriptions")
      .then((res) => setData(res.data.data || []));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Subscriptions</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.user_name || "N/A"}</td>
              <td>{d.email}</td>
              <td>{d.plan_name}</td>
              <td>{d.plan_status}</td>
              <td>{d.amount || "-"}</td>
              <td>{d.payment_status || "-"}</td>
              <td>{new Date(d.plan_purchase_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subscriptions;
