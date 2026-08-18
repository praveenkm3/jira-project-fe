import { PieChart } from "@mui/x-charts/PieChart";
import { useGetBoardStatusCounts } from "../hooks/dashboard.hooks";
import PageLoader from "../components/Loader";
import { Box, Chip, Typography } from "@mui/material";

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

export const PieChartStatus = () => {
  const { data: statusData, isLoading } = useGetBoardStatusCounts();

  if (isLoading) {
    return <PageLoader />;
  }

  const data =
    statusData?.map((item: { status: string; count: number }) => ({
      label: item.status,
      value: Number(item.count),
    })) ?? [];

  const total = data.reduce(
    (sum: number, item: { status: string; value: number }) => sum + item.value,
    0,
  );

  return (
    <Box>
      <Typography sx={{ fontWeight: 700 }}>Status Overview</Typography>
      <Typography sx={{ fontWeight: 500 }}>
        Get a snapshot of the work items
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 2,
          height: "100px",
        }}
      >
        <PieChart
          series={[
            {
              innerRadius: 50,
              outerRadius: 100,
              data,
              arcLabel: "value",
            },
          ]}
          {...settings}
          sx={{ mb: "auto" }}
        />
        <Box sx={{ mt: 10 }}>
          {data.map(
            (item: { status: string; value: number; label: string }) => {
              const percentage =
                total > 0 ? Math.round((item.value / total) * 100) : 0;

              return (
                <Box
                  key={item.label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 3,
                    mb: 1.5,
                    mr: 10,
                  }}
                >
                  <Typography>
                    <Chip
                      color={
                        item.label === "Open"
                          ? "error"
                          : item.label === "In Progress"
                            ? "warning"
                            : "primary"
                      }
                      sx={{ height: 10, width: 10, mr: 2 }}
                    />
                    {item.label}
                  </Typography>

                  <Typography sx={{ fontWeight: 700 }}>
                    {percentage}%
                  </Typography>
                </Box>
              );
            },
          )}
        </Box>
      </Box>
    </Box>
  );
};
