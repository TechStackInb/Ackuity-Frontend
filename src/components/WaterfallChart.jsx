import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  Tooltip,
  XAxis,
  ResponsiveContainer,
} from "recharts";

const datas = [
  { name: "All", value: 1000, label: "All" },
  { name: "Served", value: [750, 1000], label: "Served" },
  { name: "Denied", value: [500, 750], label: "Denied" },
  { name: "Transformed", value: [240, 500], label: "Transformed" },
  { name: "Flagged", value: [0, 240], label: "Flagged" },
];

function Waterfall() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={datas}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid strokeDasharray="1 10" vertical={false} />
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
    </ResponsiveContainer>
  );
}

export default Waterfall;
