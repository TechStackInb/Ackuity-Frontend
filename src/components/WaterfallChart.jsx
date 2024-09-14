import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  Tooltip,
  XAxis,
} from "recharts";

const datas = [
  { name: "All", value: 1000, label: "All" },
  { name: "Served", value: [750, 1000], label: "Served" },
  { name: "Denied", value: [600, 750], label: "Denied" },
  { name: "Transformed", value: [400, 600], label: "Transformed" },
  { name: "Flagged", value: [299, 400], label: "Flagged" },
];

const horizontalPoints = [0, 60, 110, 160, 210, 260, 310, 360, 410, 480];



function Waterfall() {
  return (
    <BarChart
      width={500}
      height={400}
      data={datas}
      margin={{
        top: 20,
      }}
    >
      <CartesianGrid
        strokeDasharray="1 10"
        vertical={false}
        // horizontalCoordinatesGenerator={args => {
        //   let hPoints = [];
        //   const totalLines = Math.ceil(args.offset.height / 70);
        //   const hScale = scaleLinear()
        //     .range([args.offset.top, args.height - args.offset.bottom])
        //     .domain([0, totalLines]);

        //   for (let i = 0; i <= totalLines; i++) {
        //     hPoints = [...hPoints, hScale(i)];
        //   }

        //   console.log(hPoints, args);
        //   return hPoints;
        // }}
      />
      <XAxis dataKey="name" height={20} stroke="#fff" />
      <Legend
        verticalAlign="top"
        height={36}
        content={<p style={{ margin: 0 }}></p>}
      />
      <Tooltip
        cursor={false}
        separator=""
        formatter={(value, name, props) => {
          return [props.payload.label, ""];
        }}
      />
      <Bar
        fill="#31B476"
        dataKey="value"
        maxBarSize={50}
        radius={[15, 15, 0, 0]}
      >
        <LabelList position="top" dataKey="label" />
      </Bar>
    </BarChart>
  );
}

export default Waterfall;
