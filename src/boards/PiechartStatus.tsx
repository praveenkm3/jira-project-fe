import { PieChart } from "@mui/x-charts/PieChart";
import { useGetBoardStatusCounts } from "../hooks/dashboard.hooks";
import PageLoader from "../components/Loader";
import { Box, Typography } from "@mui/material";

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

const colors = [
  "#1976D2",
  "#2E7D32",
  "#ED6C02",
  "#9C27B0",
  "#D32F2F",
  "#0288D1",
  "#7B1FA2",
  "#388E3C",
  "#F57C00",
  "#455A64",
  "#00897B",
  "#5E35B1",
  "#C62828",
  "#6D4C41",
  "#546E7A",
];

export const PieChartStatus = () => {
  const { data: statusData, isLoading } = useGetBoardStatusCounts();

  if (isLoading) {
    return <PageLoader />;
  }

  const statusMap: Record<string, number> = {};

  statusData?.forEach(
    (item: {
      status_id: string;
      status_name: string;
      count: string | number;
    }) => {
      const status = item.status_name;
      const count = Number(item.count);

      statusMap[status] = (statusMap[status] || 0) + count;
    },
  );
  const data = Object.entries(statusMap).map(([status, value], index) => ({
    id: status,
    label: status,
    value: value,
    color: colors[index % colors.length],
  }));
  const total = data.reduce((sum, item) => sum + item.value, 0);

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
          {data.map((item) => {
            const percentage =
              total > 0 ? Math.round((item.value / total) * 100) : 0;
            return (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 3,
                  mb: 1.5,
                  mr: 10,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      minWidth: 10,
                      borderRadius: "50%",
                      backgroundColor: item.color,
                      mr: 2,
                    }}
                  />

                  <Typography>{item.label}</Typography>
                </Box>
                <Typography sx={{ fontWeight: 700 }}>{percentage}%</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
