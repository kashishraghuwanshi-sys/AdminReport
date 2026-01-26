
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const NotRenewedUsers = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:5000/api/admin/reports/not-renewed"
        );
        setData(res.data?.data || []);
      } catch (e) {
        console.error(e);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50"
        >
          ← Back
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-1">Not Renewed Users</h2>

      <p className="text-gray-700 font-semibold mb-4">
        Not Renewed Users: {loading ? "Loading..." : data.length}
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="overflow-x-auto bg-white border rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">S. No.</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Last Plan</th>
                <th className="p-3 text-left">Expired On</th>
              </tr>
            </thead>

            <tbody>
              {data.map((u, index) => (
                <tr key={u.user_id ?? index} className="border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.phone}</td>
                  <td className="p-3">{u.last_plan || "-"}</td>
                  <td className="p-3">
                    {u.last_expires_at
                      ? new Date(u.last_expires_at).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NotRenewedUsers;