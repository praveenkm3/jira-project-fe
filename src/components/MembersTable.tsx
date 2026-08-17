import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type{ UserOption } from '../utils/use.types';
import dayjs from "dayjs";


export default function MembersTable({rows}:{rows:UserOption[]}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead >
          <TableRow sx={{bgcolor:"black"}}>
            <TableCell sx={{color:"white"}}>Email</TableCell>
            <TableCell sx={{color:"white"}} align="right">User Name</TableCell>
            <TableCell sx={{color:"white"}} align="right">Role</TableCell>
            <TableCell sx={{color:"white"}} align="right">Is Active</TableCell>
            <TableCell sx={{color:"white"}} align="right">Joined At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:UserOption) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">{dayjs(row.joinedat).format("DD MMM YYYY")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

