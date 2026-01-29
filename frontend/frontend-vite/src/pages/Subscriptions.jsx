// import { useEffect, useState } from "react";
// import axios from "axios";

// const Subscriptions = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get("/api/admin/subscriptions")
//       .then((res) => setData(res.data.data || []));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Subscriptions</h1>

//       <table className="w-full border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th>User</th>
//             <th>Email</th>
//             <th>Plan</th>
//             <th>Status</th>
//             <th>Amount</th>
//             <th>Payment</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((d, i) => (
//             <tr key={i}>
//               <td>{d.user_name || "N/A"}</td>
//               <td>{d.email}</td>
//               <td>{d.plan_name}</td>
//               <td>{d.plan_status}</td>
//               <td>{d.amount || "-"}</td>
//               <td>{d.payment_status || "-"}</td>
//               <td>{new Date(d.plan_purchase_date).toLocaleDateString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Subscriptions;



import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { fetchSubscriptions } from "../api/adminReport.api";

const Subscriptions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchSubscriptions(); // returns response.data
        setData(res?.data || []);
      } catch (err) {
        console.error("Failed to fetch subscriptions:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-4">
        <BackButton fallback="/" label="← Back" />
      </div>

      <h1 className="text-2xl font-bold mb-4">Subscriptions</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">S. No.</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Plan</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Payment</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {data.map((d, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{d.user_name || "N/A"}</td>
                <td className="p-2">{d.email || "-"}</td>
                <td className="p-2">{d.plan_name || "-"}</td>
                <td className="p-2">{d.plan_status || d.status || "-"}</td>
                <td className="p-2">{d.amount ?? "-"}</td>
                <td className="p-2">{d.payment_status ?? "-"}</td>
                <td className="p-2">
                  {d.plan_purchase_date
                    ? new Date(d.plan_purchase_date).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Subscriptions;