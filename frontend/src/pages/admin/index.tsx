import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TableContainer from "@mui/material/TableContainer";
import Tooltip from "@mui/material/Tooltip";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CampaignFormDialog from "./CampaignDialog";
import Title from "../../components/Title";

import {
  getCampaigns,
  addCampaign,
  updateCampaign,
  deleteCampaign,
} from "../../api/campaigns";

const newCampaign = {
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
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editableCampaign, setEditableCampaign] =
    useState<ICampaign>(newCampaign);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCloseDialog = (): void => setDialogOpen(false);
  const handleEditCampaign = (campaign: ICampaign): void => {
    setEditableCampaign(campaign);
    setDialogOpen(true);
  };

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
            Sprout
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
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
                    <TableCell>{campaign.heading}</TableCell>
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
