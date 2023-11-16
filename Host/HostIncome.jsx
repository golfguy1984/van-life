import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Ju",
    pv: 4000
  },
  {
    name: "Au",
    pv: 3500
  },
  {
    name: "Se",
    pv: 2500
  },
  {
    name: "Oc",
    pv: 3000
  },
  {
    name: "No",
    pv: 1500
  },
  {
    name: "De",
    pv: 2000
  }
];

function HostIncome() {

  function formatYAxis(value) {
    if (value === 0) return "$0";
    if (value === 1000) return "$1k";
    if (value === 2000) return "$2k";
    if (value === 3000) return "$3k";
    if (value === 4000) return "$4k";
    if (value === 5000) return "$5k";
    return value;
  }

  return (
    <>
      <div className='host-income-top'>
        <h3>Income</h3>
        <p>last 30 days</p>
        <h2>$2,260</h2>
      </div>
      <div className='chart-container'>
        <ResponsiveContainer width="100%" height={350} className="test">
          <BarChart
            // width={500}
            // height={300}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0
            }}
          >
            <CartesianGrid 
              strokeDasharray="18 15" 
              vertical={false}
              />
            <XAxis
              dataKey="name"
              style={{
                fontWeight: "bold",
                fontFamily: "sans-serif"
              }}
              tick={{ fill: "lightgrey" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, "dataMax"]}
              ticks={[0, 1000, 2000, 3000, 4000, 5000]}
              tickFormatter={formatYAxis}
              axisLine={false}
              tickLine={false}
              tickMargin={25}
            />
            <Tooltip />
            <Bar dataKey="pv" fill="#FF8C38" radius={[5, 5, 0, 0]} barSize={23} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3>Your Transactions(3)</h3>
        <p>Last 30 days</p>
      </div>
      <>List goes here</>
    </>
  )
}

export default HostIncome