import TotalCountsDisplay from "../boards/TotalCounts";
import { PieChartStatus } from "../boards/PiechartStatus";
import { Box } from "@mui/material";
import { RecentOverview } from "../boards/RecentOverview";
import { BarChartPriority } from "../boards/BarChartPriority";
import { BarChartType } from "../boards/BarChartType";

export const Dashboard = () => {
  return (
    <>
      <TotalCountsDisplay />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gridTemplateRows: "350px 350px",
          gap: 3,
          mt: 3,
        }}
      > 
        <Box
          sx={{
            boxShadow: 2,
            p: 3,
            height: "100%",
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          <PieChartStatus />
        </Box>
 
        <Box
          sx={{
            boxShadow: 2,
            p: 3,
            height: "100%",
            minHeight: 0,
            overflow: "auto",
          }}
        >
          <RecentOverview />
        </Box>
 
        <Box
          sx={{
            boxShadow: 2,
            p: 3,
            height: "100%",
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          <BarChartPriority />
        </Box>
 
        <Box
          sx={{
            boxShadow: 2,
            p: 3,
            height: "100%",
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          <BarChartType />
        </Box>
      </Box>
    </>
  );
};