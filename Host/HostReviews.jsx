import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useOutletContext } from "react-router-dom";

function HostReviews() {
  const { reviews } = useOutletContext();

  // reviews.length
  // add up all of the stars and devide by length
  // reduce?
  const avgStars =
    reviews?.reduce((acc, review) => acc + review.stars, 0) / reviews.length;

  const convertTime = (timeInSeconds) => {
    const date = new Date(timeInSeconds * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthName = new Date(2000, month - 1, 1).toLocaleString("default", {
      month: "long",
    });
    const day = date.getDate();
    return `${monthName} ${day}, ${year}`;
  };

  const fiveStar = reviews.filter((item) => item.stars === 5);
  const fourStar = reviews.filter((item) => item.stars === 4);
  const threeStar = reviews.filter((item) => item.stars === 3);
  const twoStar = reviews.filter((item) => item.stars === 2);
  const oneStar = reviews.filter((item) => item.stars === 1);

  const data = [
    { name: "5 Stars", pv: `${(fiveStar.length / reviews.length) * 100}` },
    { name: "4 Stars", pv: `${(fourStar.length / reviews.length) * 100}` },
    { name: "3 Stars", pv: `${(threeStar.length / reviews.length) * 100}` },
    { name: "2 Stars", pv: `${(twoStar.length / reviews.length) * 100}` },
    { name: "1 Stars", pv: `${(oneStar.length / reviews.length) * 100}` },
  ];

  const reviewEl = reviews?.map((review, index) => (
    <div className="review-wrapper" key={index}>
      <div className="star-icon-container">
        <IconContext.Provider value={{ color: "#FF8C38", size: "1.25rem" }}>
          {Array.from({ length: review.stars }).map((_, i) => (
            <FaStar key={i} />
          ))}
        </IconContext.Provider>
      </div>
      <p className="reviewer-name">
        {review["first name"]}
        <span className="review-date">{convertTime(review.date.seconds)}</span>
      </p>
      <p>{review.review}</p>
    </div>
  ));

  return (
    <div className="reviews-main-wrapper">
      <div className="reviews-top">
        <h2>Your Reviews</h2>
        <p>last 30 days</p>
      </div>
      <div className="reviews-middle">
        <h2>{avgStars}</h2>
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
        <h3>reviews ({reviews.length})</h3>
        {reviewEl}
      </div>
    </div>
  );
}

export default HostReviews;
