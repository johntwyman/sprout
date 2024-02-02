import { DateTime } from 'luxon';
import * as React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

import usePledgesApi from '../../api/pledge';
import Title from '../../components/Title';
import { usePledgesContext } from './ContextPledges';
import PledgeFormDialog from './PledgeDialog';

const newPledge: IPledge = {
  _id: "",
  raw: "",
  receivedAt: "",
  number: "",
  amount: 0,
  name: "",
  campaign_name: "",
}
export default function Pledges() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editablePledge, setEditablePledge] = React.useState<IPledge>(newPledge);
  const { pledges, setPledges } = usePledgesContext();

  const { addPledge, deletePledge, getPledges, updatePledge } = usePledgesApi();

  const handleCloseDialog = (): void => setDialogOpen(false);
  const handleEditPledge = (pledge: IPledge): void => {
    setEditablePledge(pledge);
    setDialogOpen(true);
  };

  const handleUpdatePledge = (pledge: IPledge): void => {
    updatePledge(pledge)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Campaign not updated");
        }
        setPledges(data.pledges);
      })
      .catch((error) => console.log("Error! Campaign not updated"));
  };

  const handleAddPledge = (pledge: IPledge): void => {
    addPledge(pledge)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Campaign not added");
        }
        setPledges(data.pledges);
      })
      .catch((error) => console.log("Error! Campaign not added"));
  };

  const handleDeletePledge = (id: string): void => {
    deletePledge(id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Campaign not deleted");
        }
        setPledges(data.pledges);
      })
      .catch((error) => console.log("Error! Campaign not deleted"));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = pledges.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const localisedDate = (receivedAt: string) => {
    const dateTime = DateTime.fromISO(receivedAt);
    const localDateTime = dateTime.setZone('local');
    return localDateTime.setLocale('en-au').toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);
  }

  return (
    <React.Fragment>
      <Title>Details</Title>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date received</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((pledge: IPledge) => (
                  <TableRow key={pledge._id}>
                    <TableCell>{localisedDate(pledge.receivedAt)}</TableCell>
                    <TableCell>{pledge.number}</TableCell>
                    <TableCell>{pledge.amount}</TableCell>
                    <TableCell>{pledge.name}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEditPledge(pledge)}>
                        <Tooltip title="Edit pledge" aria-label="Edit pledge">
                          <EditIcon />
                        </Tooltip>
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeletePledge(pledge._id)}
                      >
                        <Tooltip
                          title="Delete pledge"
                          aria-label="Delete pledge"
                        >
                          <DeleteIcon />
                        </Tooltip>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={pledges.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <PledgeFormDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            pledge={editablePledge}
            handleCreatePledge={handleAddPledge}
            handleUpdatePledge={handleUpdatePledge}
          />
    </React.Fragment>
  );
}