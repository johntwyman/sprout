import * as React from 'react';

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { addPledge, deletePledge, getPledges, updatePledge } from '../../api/pledge';
import Title from '../../components/Title';

const newPledge: IPledge = {
  _id: "",
  raw: "",
  receivedAt: "",
  number: "",
  amount: "",
  name: "",
  campaign_name: "",
}
export default function Pledges() {
  const [pledges, setPledges] = React.useState<IPledge[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editablePledge, setEditablePledge] = React.useState<IPledge>(newPledge);

  const handleDeletePledge = (id: string) => {
    deletePledge(id).then(() => {
      getPledges().then((pledges: IPledge[]) => {
        setPledges(pledges);
      });
    });
  };

  const handleEditPledge = (pledge: IPledge) => {
    console.log("Edit Pledge", pledge);
  };

  const toggleActivePledge = (pledge: IPledge) => {
    updatePledge(pledge._id, { active: !pledge.active }).then(() => {
      getPledges().then((pledges: IPledge[]) => {
        setPledges(pledges);
      });
    });
  };

  const visibleRows = pledges.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  return (
    <React.Fragment>
      <Title>Pledges</Title>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Heading</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell>Goal</TableCell>
                  <TableCell>Stretch</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((campaign: ICampaign) => (
                  <TableRow key={campaign._id}>
                    <TableCell>
                      <Link href={`/admin/campaign/${campaign._id}`}>
                        {campaign.heading}
                      </Link>
                    </TableCell>
                    <TableCell>{campaign.name}</TableCell>
                    <TableCell>{campaign.initial_target}</TableCell>
                    <TableCell>{campaign.stretch_target}</TableCell>
                    <TableCell>{campaign.phone_number}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => toggleActiveCampaign(campaign)}
                      >
                        {campaign.active ? (
                          <Tooltip title="Active" aria-label="Active">
                            <VisibilityIcon />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Disabled" aria-label="Disabled">
                            <VisibilityOffIcon />
                          </Tooltip>
                        )}
                      </IconButton>
                      <IconButton onClick={() => handleEditCampaign(campaign)}>
                        <Tooltip title="Details" aria-label="Details">
                          <SettingsIcon />
                        </Tooltip>
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteCampaign(campaign._id)}
                      >
                        <Tooltip
                          title="Delete campaign"
                          aria-label="Delete campaign"
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
            count={campaigns.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <CampaignFormDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            campaign={editableCampaign}
            handleCreateCampaign={handleAddCampaign}
            handleUpdateCampaign={handleUpdateCampaign}
          />
    </React.Fragment>
  );
}