/* eslint-disable react/prop-types */
import { BarChart,CartesianGrid,XAxis,YAxis,Tooltip,ResponsiveContainer,Bar } from "recharts";
const BarChartComponent = ({data}) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3 ' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey='count' fill='#3b82f6' barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
