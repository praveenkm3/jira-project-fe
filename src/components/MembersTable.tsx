import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type{ UserOption } from '../utils/use.types';
import dayjs from "dayjs";
import { toTitleCase } from '../algorithms/strings_operations';

export default function MembersTable({rows}:{rows:UserOption[]}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead >
          <TableRow sx={{bgcolor:"black"}}>
            <TableCell sx={{color:"white"}}>Email</TableCell>
            <TableCell sx={{color:"white"}} align="left">User Name</TableCell>
            <TableCell sx={{color:"white"}} align="left">Role</TableCell>
            <TableCell sx={{color:"white"}} align="left">Is Active</TableCell>
            <TableCell sx={{color:"white"}} align="left">Joined At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:UserOption) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {toTitleCase(row.email)}
              </TableCell>
              <TableCell align="left">{toTitleCase(row.name)}</TableCell>
              <TableCell align="left">{toTitleCase(row.role)}</TableCell>
              <TableCell align="left">{toTitleCase(row.status)}</TableCell>
              <TableCell align="left">{dayjs(row.joinedat).format("DD MMM YYYY")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

