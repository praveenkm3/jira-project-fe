import { Box, Card, CardContent, Typography, Stack } from "@mui/material"; 
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useGetBoardProgressCounts } from "../hooks/dashboard.hooks";
import PageLoader from "../components/Loader";
const StatCard = ({ icon, label, value }:{icon:React.ReactNode,label:string,value:number}) => (
  <Card variant="outlined" sx={{ flex: 1, borderRadius: 3 }}>
    <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {icon}
      <Box>
        <Typography variant="h5" sx={{fontWeight:700}}>
          {value ?? 0}
        </Typography>
        <Typography variant="body2" color="primary">
          {label}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default function TotalCountsDisplay() { 
  const {data,isLoading}=useGetBoardProgressCounts(); 
if(isLoading){
  return <PageLoader />
}
  return (
    <Box sx={{ p: 3 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
        <StatCard
          icon={<FolderOutlinedIcon />}
          label="Updated"
          value={data?.updated} 
        />
        <StatCard
          icon={<AddBoxOutlinedIcon />}
          label="Created"
          value={data?.created} 
        />
        <StatCard
          icon={<CalendarMonthOutlinedIcon />}
          label="Due soon"
          value={data?.dues_count} 
        />
      </Stack>
    </Box>
  );
}