// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// export default function UserReports() {
//   const [token, setToken] = useState("");
//   const [reportData, setReportData] = useState([]);
//   const [medidated, setMedidated] = useState(0);
//   const [exercised, setExercised] = useState(0);
//   const [slept, setSlept] = useState(0);
//   const [sober, setSober] = useState(0);

//   useEffect(() => {
//     const token = Cookies.get("token");
//     if (token) {
//       setToken(token);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchData2 = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3001/api/goals-summary",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setMedidated(response.data.Meditation);
//         setExercised(response.data.Exercise);
//         setSlept(response.data.Sleep);
//         setSober(response.data.Sober);
//       } catch (error) {
//         console.error("Error fetching goals summary:", error);
//       }
//     };
//     if (token) {
//       fetchData2();
//     }
//   }, [token]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3001/api/user-reports",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setReportData(response.data);
//       } catch (error) {
//         console.error("Error fetching report data:", error);
//       }
//     };

//     if (token) {
//       fetchData();
//     }
//   }, [token]);

//   const getCategoryData = (category) => {
//     return reportData
//       .filter((report) => report.category === category)
//       .map((report) => ({ date: report.date, value: report.value }));
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const month = date.toLocaleString("default", { month: "short" });
//     const year = date.getFullYear();
//     const suffix =
//       day === 1 || day === 21 || day === 31
//         ? "st"
//         : day === 2 || day === 22
//         ? "nd"
//         : day === 3 || day === 23
//         ? "rd"
//         : "th";
//     return `${day}${suffix} ${month} ${year}`;
//   };

//   const renderCharts = () => {
//     const categories = ["Meditation", "Exercise", "Sleep", "Sober"];
  
//     return (
//       <div className="grid grid-cols-2 gap-4 text-white text-sm  ">
//         {categories.map((category, index) => (
//           <div
//             key={category}
//             className={`p-4 rounded-lg shadow-md  ${
//               index % 2 === 0
//                 ? "bg-gradient-to-r from-indigo-400 to-indigo-300"
//                 : "bg-gradient-to-r from-teal-500 to-teal-300 "
//             }`}
//           >
//             <h3 className="font-semibold mb-4 text-3xl">{category} Chart</h3>
//             <ResponsiveContainer width={550} height={300} className={"mb-4 " }>
//               <LineChart
//                 data={getCategoryData(category)}
//                 margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//               >
//                 <XAxis dataKey="date" tickFormatter={formatDate}  stroke="white" strokeWidth={3} />
//                 <YAxis stroke="white" strokeWidth={3} />
//                 <Tooltip stroke="white" strokeWidth={3}  />
//                 <Legend stroke="white" strokeWidth={3}  />
//                 <Line type="monotone" dataKey="value" stroke="white"  strokeWidth={3} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         ))}
//       </div>
//     );
//   };
  

//   return (
//     <div className="flex flex-col items-center justify-start  bg-gradient-to-r from-teal-50 to-teal-200 p-8 h-full">
      
//       <h1 className="text-3xl font-bold mb-4  text-gray-500">
//         Daily Wellness Quiz Reports
//       </h1>
//       <div className="">

//       {reportData.length > 0 && renderCharts()}
//       </div>
//       <div className="flex flex-col items-start justify-between mt-4 text-white  border-2 border-blue-200 bg-gradient-to-r from-blue-500 to-blue-300 p-3  rounded-lg shadow-md">
//         <p className="text-xl">Total minutes meditated: {medidated}</p>
//         <p className="text-xl">Total minutes exercised: {exercised}</p>
//         <p className="text-xl">Total hours slept: {slept}</p>
//         <p className="text-xl">Total sober days: {sober}</p>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function UserReports() {
  const [token, setToken] = useState("");
  const [reportData, setReportData] = useState([]);
  const [medidated, setMedidated] = useState(0);
  const [exercised, setExercised] = useState(0);
  const [slept, setSlept] = useState(0);
  const [sober, setSober] = useState(0);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/goals-summary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMedidated(response.data.Meditation);
        setExercised(response.data.Exercise);
        setSlept(response.data.Sleep);
        setSober(response.data.Sober);
      } catch (error) {
        console.error("Error fetching goals summary:", error);
      }
    };
    if (token) {
      fetchData2();
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/user-reports",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReportData(response.data);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const getCategoryData = (category) => {
    return reportData
      .filter((report) => report.category === category)
      .map((report) => ({ date: report.date, value: report.value }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";
    return `${day}${suffix} ${month} ${year}`;
  };

  const renderCharts = () => {
    const categories = ["Meditation", "Exercise", "Sleep", "Sober"];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-sm  ">
        {categories.map((category, index) => (
          <div
            key={category}
            className={`p-4 rounded-lg shadow-md  ${
              index % 2 === 0
                ? "bg-gradient-to-r from-indigo-700 to-indigo-300"
                : "bg-gradient-to-r from-teal-500 to-teal-700 "
            }`}
          >
            <h3 className="font-semibold mb-4 text-xl md:text-3xl">{category} Chart</h3>
            <ResponsiveContainer width="100%" height={300} className={"mb-4"}>
              <LineChart
                data={getCategoryData(category)}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="date" tickFormatter={formatDate} stroke="black" strokeWidth={3} />
                <YAxis stroke="black" strokeWidth={3} />
                <Tooltip stroke="white" strokeWidth={3} />
                <Legend stroke="white" strokeWidth={3} />
                <Line type="monotone" dataKey="value" stroke="black" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-start bg-gradient-to-r from-teal-50 to-teal-200 p-4 md:p-8 min-h-screen">
      
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-500">
        Daily Wellness Quiz Reports
      </h1>
      
      <div className="w-full md:max-w-3xl">
        {reportData.length > 0 && renderCharts()}
      </div>
      
      <div className="flex flex-col items-start justify-between mt-4 text-black border-2 border-blue-200 bg-gradient-to-r from-blue-500 to-blue-300 p-3 rounded-lg shadow-md w-full md:max-w-3xl">
        <p className="text-lg md:text-xl">Total minutes meditated: {medidated}</p>
        <p className="text-lg md:text-xl">Total minutes exercised: {exercised}</p>
        <p className="text-lg md:text-xl">Total hours slept: {slept}</p>
        <p className="text-lg md:text-xl">Total sober days: {sober}</p>
      </div>
    </div>
  );
}
