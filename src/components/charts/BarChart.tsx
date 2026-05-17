import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: { name: string; value: number }[];
  color?: string;
}

export default function BarChart({ data, color = '#D4AF37' }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <RechartsBar data={data} barSize={32}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
        <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
        <Tooltip
          contentStyle={{ background: '#141414', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#fff' }}
        />
        <Bar dataKey="value" fill={color} radius={[8, 8, 0, 0]} />
      </RechartsBar>
    </ResponsiveContainer>
  );
}
