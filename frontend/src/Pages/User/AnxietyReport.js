// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import Cookies from "js-cookie";

// const AnxietyReport = () => {
//   const [results, setResults] = useState([]);
//   const [token, setToken] = useState("");

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const token = Cookies.get("token");
//         setToken(token);
//         const response = await axios.get(
//           "http://localhost:3001/api/allResults",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setResults(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching results:", error);
//       }
//     };

//     fetchResults();
//   }, []);

//   const formatDate = (dateString) => {
//     const options = {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//     };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="flex flex-col items-center justify-start  bg-gradient-to-r from-teal-50 to-teal-200 p-8 h-screen">
//       <h1 className="text-4xl font-extrabold text-gray-500 mb-10">
//         Anxiety Test Report
//       </h1>
//       <div className="bg-white shadow-md rounded-lg p-4 bg-gradient-to-r from-indigo-400 to-indigo-300">
//         <ResponsiveContainer width={800} height={400}>
//           <LineChart data={results}>
//             <XAxis strokeWidth={3} stroke="white" dataKey="Date"  tickFormatter={formatDate} />
//             <YAxis strokeWidth={3}stroke="white" />
//             <Tooltip stroke="white " strokeWidth={3} cursor={{ stroke: "#374151", strokeWidth: 2 }} />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="score"
//               stroke="white"
//               strokeWidth={5}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default AnxietyReport;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Cookies from "js-cookie";

const AnxietyReport = () => {
  const [results, setResults] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = Cookies.get("token");
        setToken(token);
        const response = await axios.get(
          "http://localhost:3001/api/allResults",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-r from-teal-400 to-teal-800 p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10">
        Anxiety Test Report
      </h1>
      <div className="bg-white shadow-md rounded-lg p-4 w-full md:w-3/4 lg:w-1/2 xl:w-2/3">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={results}>
            <CartesianGrid strokeDasharray="3 3" fill="#f0f4f7" />
            <XAxis
              strokeWidth={3}
              stroke="gray"
              dataKey="Date"
              tickFormatter={formatDate}
            />
            <YAxis strokeWidth={3} stroke="gray" />
            <Tooltip
              contentStyle={{ backgroundColor: "white", color: "black" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="score"
              stroke="black"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnxietyReport;
