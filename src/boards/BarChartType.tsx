import { BarChart } from "@mui/x-charts/BarChart";
import { useGetBoardTypeCounts } from "../hooks/dashboard.hooks";
import PageLoader from "../components/Loader";
import { Box, Typography } from "@mui/material";

export const BarChartType = () => {
  const { data, isLoading } = useGetBoardTypeCounts();

  if (isLoading) {
    return <PageLoader />;
  }

  const typeNames = data.map(
    (item: { type: string; count: number | string }) => item.type
  );

  const typeCounts = data.map(
    (item: { type: string; count: number | string }) => Number(item.count)
  );

  return (
    <Box>
      <Typography sx={{ fontWeight: 700 }}>
        Issue Overview
      </Typography>

      <Typography sx={{ fontWeight: 500 }}>
        Issue Type Breakdown
      </Typography>

      <BarChart
        layout="horizontal"
        yAxis={[
          {
            data: typeNames,
            scaleType: "band",
            colorMap: {
              type: "ordinal",
              values: ["Feature", "Task", "Bug"],
              colors: [
                "#3b82f6",
                "#22c55e",  
                "#f5510b",  
              ],
            },
          },
        ]}
        xAxis={[
          {
            min: 0,
            tickMinStep: 1,
          },
        ]}
        series={[
          {
            data: typeCounts,
            label: "Issue Types", 
            color:"none"
          },
        ]}
        height={250}
        borderRadius={8}
        grid={{ vertical: true }}
        margin={{
          top: 20,
          bottom: 40,
          left: 70,
          right: 20,
        }}
      />
    </Box>
  );
};