import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function PageLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        height: "100%",
        width: "100%",
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress size={44} thickness={3.5} sx={{ color: "#6366F1" }} />
      </Box>
    </Box>
  );
}
