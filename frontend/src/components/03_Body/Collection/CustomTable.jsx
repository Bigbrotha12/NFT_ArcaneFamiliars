import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function CustomTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Statistic</TableCell><TableCell>Value</TableCell>
            <TableCell>Statistic</TableCell><TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>HP</TableCell><TableCell>{props.stats.hp}</TableCell>
            <TableCell>FP</TableCell><TableCell>{props.stats.mp}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Attack</TableCell><TableCell>{props.stats.atk}</TableCell>
            <TableCell>Defense</TableCell><TableCell>{props.stats.def}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Arcane</TableCell><TableCell>{props.stats.arc}</TableCell>
            <TableCell>Speed</TableCell><TableCell>{props.stats.spd}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
