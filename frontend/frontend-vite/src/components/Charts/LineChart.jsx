// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// export default ({ data, title }) => (
//   <div className="bg-white p-4 rounded shadow w-full">
//     <h3 className="font-semibold mb-4 text-gray-700">{title}</h3>
    
//     {/* FIX: Height set to 300px */}
//     <div className="h-[300px] w-full">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="label" />
//           <YAxis />
//           <Tooltip />
//           <Line 
//             type="monotone" 
//             dataKey="value" 
//             stroke="#16a34a" 
//             strokeWidth={3}
//             dot={{ r: 4 }}
//             activeDot={{ r: 8 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   </div>
// );


import { LineChart as RechartsLine, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const LineChart = ({ data, title }) => (
  <div className="bg-white p-4 rounded shadow w-full">
    <h3 className="font-semibold mb-4 text-gray-700">{title}</h3>
    
    {/* ✅ FIX: Inline style + minWidth + debounce */}
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={100} debounce={200}>
        <RechartsLine data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#16a34a" 
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
        </RechartsLine>
      </ResponsiveContainer>
    </div>
  </div>
);

export default LineChart;