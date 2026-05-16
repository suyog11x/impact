import { RadarChart as RechartsRadar, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface RadarChartProps {
  data: { subject: string; value: number }[];
}

export default function RadarChart({ data }: RadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <RechartsRadar data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.1)" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
        <Radar dataKey="value" stroke="#ccff00" fill="#ccff00" fillOpacity={0.2} strokeWidth={2} />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
