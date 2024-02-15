import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Box, Button, Dialog, Grid, Snackbar, TextField } from '@mui/materia';

interface CampaignFormDialogProps {
  open: boolean;
  onClose: () => void;
  campaign: ICampaign;
  handleCreateCampaign: (campaign: ICampaign) => void;
  handleUpdateCampaign: (campaign: ICampaign) => void;
}

const CampaignFormDialog: React.FC<CampaignFormDialogProps> = ({
  open,
  onClose,
  campaign,
  handleCreateCampaign,
  handleUpdateCampaign,
}) => {
  const [formData, setFormData] = useState<ICampaign>(campaign);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(campaign);
  }, [campaign]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (formData._id !== "") {
        await handleUpdateCampaign(formData);
      } else {
        await handleCreateCampaign(formData);
      }
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 409) {
          setDbError("Campaign name already exists");
        }
      } else {
        setDbError("An error occurred while creating the campaign");
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name (used for the URL)"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Heading"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Initial target"
              name="initial_target"
              value={formData.initial_target}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Stretch target"
              name="stretch_target"
              value={formData.stretch_target}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="SMS Autoresponse"
              name="sms_autoresponse"
              value={formData.sms_autoresponse}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="text" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="text" onClick={handleSubmit}>
                {campaign._id ? "Update" : "Create"}
              </Button>
            </Box>
            {dbError && <Snackbar open={true} autoHideDuration={3000} onClose={() => setDbError(null)} message={dbError} />}
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default CampaignFormDialog;
