import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

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

  useEffect(() => {
    setFormData(campaign);
  }, [campaign]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    if (formData._id !== "") {
      handleUpdateCampaign(formData);
    } else {
      handleCreateCampaign(formData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Heading"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Initial target"
              name="initial_target"
              value={formData.initial_target}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Stretch target"
              name="stretch_target"
              value={formData.stretch_target}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Phone number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="SMS Autoresponse"
              name="sms_autoresponse"
              value={formData.sms_autoresponse}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          {/* Add fields for other campaign properties here */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="text" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="text" onClick={handleSubmit}>
                {campaign._id ? "Update" : "Create"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default CampaignFormDialog;
