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
  multiData?: WhiskyCharacteristic[][];
  comparedNames?: string[];
}

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#a83279",
  "#2c3e50",
];

const WhiskyRadarChart: React.FC<WhiskyRadarChartProps> = ({
  data,
  maxValue = 5,
  multiData,
  comparedNames = [],
}) => {
  // If multiData is provided, merge data for RadarChart
  if (multiData && multiData.length > 1) {
    // Assume all arrays have the same characteristics order
    const chartData = multiData[0].map((_, i) => {
      const entry: any = { characteristic: multiData[0][i].characteristic };
      multiData.forEach((d, idx) => {
        entry[`value${idx}`] = d[i].value;
      });
      return entry;
    });
    return (
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="characteristic" />
          <PolarRadiusAxis angle={30} domain={[0, maxValue]} />
          {multiData.map((_, idx) => (
            <Radar
              key={idx}
              name={comparedNames[idx] || `Whisky ${idx + 1}`}
              dataKey={`value${idx}`}
              stroke={COLORS[idx % COLORS.length]}
              fill={COLORS[idx % COLORS.length]}
              fillOpacity={0.3}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    );
  }
  // Fallback to single data
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
