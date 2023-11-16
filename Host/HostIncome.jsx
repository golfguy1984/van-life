import React, {useEffect, useState} from 'react'
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
import { useOutletContext } from 'react-router-dom';

const data = [
  {
    name: "January",
    pv: 4000
  },
  {
    name: "February",
    pv: 3500
  },
  {
    name: "March",
    pv: 2500
  },
  {
    name: "April",
    pv: 3000
  },
  {
    name: "May",
    pv: 1500
  },
  {
    name: "June",
    pv: 2000
  }
];

function HostIncome() {
const {income} = useOutletContext()


const [incomeData, setIncomeData] = useState(data)
const [transactions, setTransactions] = useState(Object.values(income[0]).filter(value => typeof value === 'number'))




useEffect(() => {
  const updatedData = incomeData.map(initialItem => {
    const matchingNewItem = income.find(newItem => newItem.id === initialItem.name);
  
    if (matchingNewItem) {
      const updatedPv = Object.values(matchingNewItem).reduce((sum, value) => {
        if (typeof value === 'number') {
          return sum + value;
        }
        return sum;
      }, 0);
  
      return { ...initialItem, pv: updatedPv };
    }
  
    return initialItem;
  });
  
  setIncomeData(updatedData)

}, [income])


  function formatYAxis(value) {
    if (value === 0) return "$0";
    if (value === 1000) return "$1k";
    if (value === 2000) return "$2k";
    if (value === 3000) return "$3k";
    if (value === 4000) return "$4k";
    if (value === 5000) return "$5k";
    return value;
  }

  function formatXAxis(value) {
    if (value === "January") return "Ja";
    if (value === "February") return "Fe";
    if (value === "March") return "Ma";
    if (value === "April") return "Ap";
    if (value === "May") return "May";
    if (value === "June") return "Ju";
    return value;
  }

  const transactionsEL = transactions.map(item => (
    <div className='host-vans-wrapper'>
      <h2>${item}</h2>
      <p>1/12/23</p>
    </div>
  ))

  console.log(transactions)

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
            data={incomeData}
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
              tickFormatter={formatXAxis}
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
      <div className='transactions-header'>
        <h3>Your Transactions (3)</h3>
        <p>Last 30 days</p>
      </div>
      <div className='host-vans-main-container transactions'>
        {transactionsEL}
      </div>
    </>
  )
}

export default HostIncome