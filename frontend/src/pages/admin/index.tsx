import * as React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
    AppBar, Button, Container, CssBaseline, IconButton, Stack, Table, TableBody, TableCell,
    TableContainer, TableHead, TablePagination, TableRow, Toolbar, Tooltip, Typography
} from '@mui/material';

import useCampaignsApi from '../../api/campaign';
import Link from '../../components/Link';
import Title from '../../components/Title';
import CampaignFormDialog from './CampaignDialog';

const newCampaign: ICampaign = {
  _id: "",
  name: "",
  heading: "",
  initial_target: 0,
  stretch_target: 0,
  phone_number: "",
  sms_autoresponse: "",
  active: true,
};

const Admin = (): React.ReactNode => {
  const [campaigns, setCampaigns] = React.useState<ICampaign[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editableCampaign, setEditableCampaign] =
    React.useState<ICampaign>(newCampaign);

  const { addCampaign, getCampaigns, updateCampaign, deleteCampaign } =
    useCampaignsApi();

  React.useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = (): void => {
    getCampaigns()
      .then(({ data: { campaigns } }: ICampaign[] | any) =>
        setCampaigns(campaigns)
      )
      .catch((err: Error) => console.log(err));
  };

  const toggleActiveCampaign = (campaign: ICampaign): void => {
    const updatedCampaign = {
      ...campaign,
      active: !campaign.active,
    };
    handleUpdateCampaign(updatedCampaign);
  };

  const handleCloseDialog = (): void => setDialogOpen(false);
  const handleEditCampaign = (campaign: ICampaign): void => {
    setEditableCampaign(campaign);
    setDialogOpen(true);
  };

  const handleUpdateCampaign = (campaign: ICampaign): void => {
    updateCampaign(campaign)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Campaign not updated");
        }
        setCampaigns(data.campaigns);
      })
      .catch((error) => console.log("Error! Campaign not updated"));
  };

  const handleAddCampaign = (campaign: ICampaign): void => {
    addCampaign(campaign)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Campaign not added");
        }
        setCampaigns(data.campaigns);
      })
      .catch((error) => console.log("Error! Campaign not added"));
  };

  const handleDeleteCampaign = (id: string): void => {
    deleteCampaign(id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Campaign not deleted");
        }
        setCampaigns(data.campaigns);
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

  const visibleRows = React.useMemo(
    () => campaigns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [campaigns, page, rowsPerPage]
  );

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <ThermostatIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            <Link
              color="inherit"
              style={{ textDecoration: "none" }}
              href="/admin"
            >
              Sprout
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Title>Campaigns</Title>
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
                      <Link href={`/admin/campaign/${campaign.name}`}>
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
                      <IconButton
                        onClick={() => {
                          window.open(`/${campaign.name}`, "_blank");
                        }}
                      >
                        <Tooltip title="View" aria-label="View">
                          <SlideshowIcon />
                        </Tooltip>
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
          <Container maxWidth="sm">
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                onClick={() => handleEditCampaign(newCampaign)}
              >
                Create campaign
              </Button>
            </Stack>
          </Container>
        </Container>
      </main>
    </>
  );
};

export default Admin;
