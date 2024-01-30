import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

interface PledgeFormDialogProps {
  open: boolean;
  onClose: () => void;
  pledge: IPledge;
  handleCreatePledge: (pledge: IPledge) => void;
  handleUpdatePledge: (pledge: IPledge) => void;
}

const PledgeFormDialog: React.FC<PledgeFormDialogProps> = ({
  open,
  onClose,
  pledge,
  handleCreatePledge,
  handleUpdatePledge,
}) => {
  const [formData, setFormData] = useState<IPledge>(pledge);

  useEffect(() => {
    setFormData(pledge);
  }, [pledge]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    if (formData._id !== "") {
      handleUpdatePledge(formData);
    } else {
      handleCreatePledge(formData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Phone number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
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
                {pledge._id ? "Update" : "Create"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default PledgeFormDialog;
