import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LineChartProps {
  data: { month: string; value: number }[];
  color?: string;
}

export default function LineChart({ data, color = '#ccff00' }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RechartsLine data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
        <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
        <Tooltip
          contentStyle={{ background: '#0c0c0c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#ebebeb' }}
        />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ fill: color, r: 4 }} />
      </RechartsLine>
    </ResponsiveContainer>
  );
}
