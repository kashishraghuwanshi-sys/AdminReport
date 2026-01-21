
// // src/pages/AdminReport.jsx
// import { useState } from "react";
// import DateRangePicker from "../components/DateRangePicker";
// import StatCard from "../components/StatCard";
// import BarChart from "../components/Charts/BarChart";
// import LineChart from "../components/Charts/LineChart";
// import PieChart from "../components/Charts/PieChart";
// import StackedBarChart from "../components/Charts/StackedBarChart"; 
// import { fetchAdminReport } from "../api/adminReport.api";

// const AdminReport = () => {
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ HELPER: Full Date Formatter
//   // Input: "2025-12-01" -> Output: "01 Dec 2025"
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
    
//     // String split karke parts nikale (Browser Timezone issue se bachne ke liye)
//     const [year, month, day] = dateString.split("-"); 
    
//     // Date object banaya
//     const dateObj = new Date(year, month - 1, day); 
    
//     // Format: Day Month Year (e.g., 01 Dec 2025)
//     return dateObj.toLocaleDateString('default', { 
//       day: '2-digit', 
//       month: 'short', 
//       year: 'numeric' 
//     });
//   };

//   // ✅ HELPER: Stacked Bar Chart ka Data Format
//   const processPlanData = (planData) => {
//     if (!planData || !Array.isArray(planData)) return [];

//     const grouped = {};

//     planData.forEach((item) => {
//       // Yahan ab hum poori date format kar rahe hain
//       const dateKey = formatDate(item.period); 
      
//       if (!grouped[dateKey]) {
//         grouped[dateKey] = { label: dateKey }; 
//       }
      
//       grouped[dateKey][item.plan_name] = Number(item.count);
//     });

//     return Object.values(grouped);
//   };

//   const handleGenerate = async (fromDate, toDate) => {
//     try {
//       setLoading(true);
//       console.log("1. Requesting Data for:", fromDate, "to", toDate);

//       // API Call
//       const response = await fetchAdminReport(fromDate, toDate, "month");
      
//       console.log("2. API RAW Response:", response);

//       let actualData = null;

//       // --- SMART DATA DETECTION LOGIC ---
//       if (response && response.summary) {
//         actualData = response;
//       } 
//       else if (response && response.data && response.data.summary) {
//         actualData = response.data;
//       }
//       else if (response && response.data && response.data.data && response.data.data.summary) {
//         actualData = response.data.data;
//       }

//       if (actualData) {
//         console.log("3. Data Found & Set:", actualData);
//         setReport(actualData);
//       } else {
//         console.error("❌ Data structure match nahi hua!");
//         alert("Data received but structure is wrong. Check Console.");
//       }

//     } catch (err) {
//       console.error("Failed to load report", err);
//       alert("Something went wrong while fetching data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="p-10 text-center text-blue-600 font-bold text-xl">Loading report data...</div>;

//   return (
//     <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold text-gray-800">Admin Usage Report</h1>

//       {/* Date Picker Component */}
//       <DateRangePicker onGenerate={handleGenerate} />

//       {report ? (
//         <>
//           {/* 1. STATS CARDS */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <StatCard title="Total Users" value={report.summary?.users?.total_users || 0} />
//             <StatCard title="Approved Users" value={report.summary?.users?.approved_users || 0} />
//             <StatCard title="Subscriptions" value={report.summary?.subscriptions?.total_subscriptions || 0} />
//             <StatCard title="Messages" value={report.summary?.messages?.total_messages || 0} />
//           </div>

//           {/* 2. CHARTS GRID (2 Columns) */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
//             {/* Chart 1: Monthly New Users */}
//             <BarChart
//               title="Monthly New Users"
//               data={report.timeline?.users?.map(item => ({
//                 label: formatDate(item.period), // ✅ Full Date: 01 Dec 2025
//                 value: Number(item.total_users)
//               })) || []}
//             />

//             {/* Chart 2: Messages Trend */}
//             <LineChart
//               title="Messages Trend"
//               data={report.timeline?.messages?.map(item => ({
//                 label: formatDate(item.period), // ✅ Full Date: 01 Dec 2025
//                 value: Number(item.total_messages)
//               })) || []}
//             />

//             {/* Chart 3: User Status Distribution (Pie Chart) */}
//             <PieChart
//               title="User Status Distribution"
//               data={[
//                 { label: "Approved", value: Number(report.summary?.users?.approved_users || 0) },
//                 { label: "Hold", value: Number(report.summary?.users?.hold_users || 0) },
//                 { label: "Deactivated", value: Number(report.summary?.users?.deactivated_users || 0) }
//               ].filter(item => item.value > 0)}
//             />

//             {/* Chart 4: Plan Purchases Timeline (Side-by-Side) */}
//             <StackedBarChart 
//                 title="Plan Purchases Timeline"
//                 data={processPlanData(report.timeline?.plans)}
//             />

//           </div>
//         </>
//       ) : (
//         <div className="mt-10 text-center text-gray-500">
//           <p>👆 Please select a date range and click "Generate Report"</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminReport;



// src/pages/AdminReport.jsx
import { useState } from "react";
import DateRangePicker from "../components/DateRangePicker";
import StatCard from "../components/StatCard";
import BarChart from "../components/Charts/BarChart";
import LineChart from "../components/Charts/LineChart";
import PieChart from "../components/Charts/PieChart";
import StackedBarChart from "../components/Charts/StackedBarChart";
import { fetchAdminReport } from "../api/adminReport.api";

const AdminReport = () => {
  // ✅ Dates moved to PARENT
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString("default", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const processPlanData = (planData) => {
    if (!Array.isArray(planData)) return [];

    const grouped = {};
    planData.forEach((item) => {
      const key = formatDate(item.period);
      if (!grouped[key]) grouped[key] = { label: key };
      grouped[key][item.plan_name] = Number(item.count);
    });

    return Object.values(grouped);
  };

  const handleGenerate = async () => {
    if (!fromDate || !toDate) {
      alert("Please select both dates");
      return;
    }

    try {
      setLoading(true);

      const response = await fetchAdminReport(fromDate, toDate, "month");

      let actualData =
        response?.summary
          ? response
          : response?.data?.summary
          ? response.data
          : response?.data?.data?.summary
          ? response.data.data
          : null;

      if (!actualData) {
        alert("Invalid response structure. Check console.");
        console.error(response);
        return;
      }

      setReport(actualData);
    } catch (err) {
      console.error("API Error:", err);
      alert("Failed to fetch report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">
        Admin Usage Report
      </h1>

      {/* ✅ Controlled Date Picker */}
      <DateRangePicker
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        onGenerate={handleGenerate}
      />

      {loading && (
        <div className="text-center text-blue-600 font-semibold">
          Loading report...
        </div>
      )}

      {report && (
        <>
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard title="Total Users" value={report.summary.users.total_users} />
            <StatCard title="Approved Users" value={report.summary.users.approved_users} />
            <StatCard title="Subscriptions" value={report.summary.subscriptions.total_subscriptions} />
            <StatCard title="Messages" value={report.summary.messages.total_messages} />
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BarChart
              title="Users Growth"
              data={report.timeline.users.map((u) => ({
                label: formatDate(u.period),
                value: Number(u.total_users),
              }))}
            />

            <LineChart
              title="Messages Trend"
              data={report.timeline.messages.map((m) => ({
                label: formatDate(m.period),
                value: Number(m.total_messages),
              }))}
            />

            <PieChart
              title="User Status"
              data={[
                { label: "Approved", value: +report.summary.users.approved_users },
                { label: "Hold", value: +report.summary.users.hold_users },
                { label: "Deactivated", value: +report.summary.users.deactivated_users },
              ]}
            />

            <StackedBarChart
              title="Plan Purchases"
              data={processPlanData(report.timeline.plans)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminReport;
