import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";

function HostReviews() {
  const data = [
    { name: "5 Stars", pv: 100 },
    { name: "4 Stars", pv: 30 },
    { name: "3 Stars", pv: 0 },
    { name: "2 Stars", pv: 0 },
    { name: "1 Stars", pv: 10 },
    // Add more data as needed
  ];
  return (
    <div className="reviews-main-wrapper">
      <div className="reviews-top">
        <h2>Your Reviews</h2>
        <p>last 30days</p>
      </div>
      <div className="reviews-middle">
        <h2>5.0</h2>
        <IconContext.Provider value={{ color: "#FF8C38", size: "1.25rem" }}>
          <FaStar />
        </IconContext.Provider>
        <p>overall rating</p>
      </div>
      <ResponsiveContainer
        width="100%"
        height={200}
        className="reviews-container"
      >
        <BarChart
          // width={500}
          // height={300}
          layout="vertical"
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis hide="true" type="number" domain={[0, 100]} />
          <YAxis
            dx={-15}
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
          />
          <Bar
            radius={[15, 15, 15, 15]}
            barSize={13}
            dataKey="pv"
            fill="#FF8C38"
            background={{ fill: "#eee", radius: 15 }}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="reviews-bottom">
        <h3>reviews (2)</h3>
        <div className="review-wrapper">
          <div className="star-icon-container">
            <IconContext.Provider value={{ color: "#FF8C38", size: "1.25rem" }}>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </IconContext.Provider>
          </div>
          <p className="reviewer-name">
            Name <span className="review-date">December 25, 2023</span>
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            ex magnam temporibus cupiditate et deleniti dolorum, corporis odit
            necessitatibus veniam nulla voluptatibus dolor fuga facilis atque
            odio ipsum porro provident.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HostReviews;
