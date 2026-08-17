import { BarChart } from "@mui/x-charts/BarChart";
import { useGetBoardPriorityCounts } from "../hooks/dashboard.hooks";
import PageLoader from "../components/Loader";
import { Box, Typography } from "@mui/material";

export const BarChartPriority = () => {
  const { data, isLoading } = useGetBoardPriorityCounts();

  if (isLoading) {
    return <PageLoader />;
  }

  const priorityNames = data.map(
    (item: { priority: string; count: number | string }) => item.priority
  );

  const priorityCounts = data.map(
    (item: { priority: string; count: number | string }) =>
      Number(item.count)
  );

  return (
    <Box>
      <Typography sx={{ fontWeight: 700 }}>
        Status Overview
      </Typography>

      <Typography sx={{ fontWeight: 500 }}>
        Priority Breakdown
      </Typography>

      <BarChart
        xAxis={[
          {
            data: priorityNames,
            scaleType: "band",
            colorMap: {
              type: "ordinal",
              values: ["Medium", "Low", "High"],
              colors: [
                "#3b82f6",
                "#22c55e",  
                "#f5510b",  
              ],
            },
          },
        ]}
        series={[
          {
            data: priorityCounts,
            label: "Issue Priority",
            barLabel: "value",
          },
        ]}
        height={250}
        borderRadius={8}
        grid={{ horizontal: true }}
        margin={{
          top: 30,
          bottom: 40,
          left: 40,
          right: 20,
        }}
      />
    </Box>
  );
};