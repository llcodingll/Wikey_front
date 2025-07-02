import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

// Define the type for a single characteristic
export interface WhiskyCharacteristic {
  characteristic: string;
  value: number;
}

// Define the props for the radar chart component
interface WhiskyRadarChartProps {
  data: WhiskyCharacteristic[];
  maxValue?: number;
}

const WhiskyRadarChart: React.FC<WhiskyRadarChartProps> = ({
  data,
  maxValue = 5,
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="characteristic" />
        <PolarRadiusAxis angle={30} domain={[0, maxValue]} />
        <Radar
          name="Whisky Characteristics"
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default WhiskyRadarChart;
