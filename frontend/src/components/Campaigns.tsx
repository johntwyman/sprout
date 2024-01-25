import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

import { getCampaigns, updateCampaign } from "../api/campaigns";

// Generate Order Data
function createData(
  id: number,
  name: string,
  heading: string,
  initial_target: number,
  stretch_target: number,
  phone_number: string,
  sms_autoresponse: string,
  pledged: number,
  active: boolean
) {
  return {
    id,
    name,
    heading,
    initial_target,
    stretch_target,
    phone_number,
    sms_autoresponse,
    pledged,
    active,
  };
}

const rows = [
  createData(
    0,
    "somelikeitlesshot",
    "Some like it (less) hot",
    4000,
    8000,
    "0412 345 678",
    "Thanks for pledging",
    375,
    false
  ),
  createData(
    1,
    "somelikeitlesshot",
    "Some like it (less) hot",
    4000,
    8000,
    "0412 345 678",
    "Thanks for pledging",
    375,
    true
  ),
  createData(
    2,
    "somelikeitlesshot",
    "Some like it (less) hot",
    4000,
    8000,
    "0412 345 678",
    "Thanks for pledging",
    375,
    false
  ),
  createData(
    3,
    "somelikeitlesshot",
    "Some like it (less) hot",
    4000,
    8000,
    "0412 345 678",
    "Thanks for pledging",
    375,
    true
  ),
];

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = (): void => {
    getCampaigns()
      .then(({ data: { campaigns } }: ICampaign[] | any) =>
        setCampaigns(campaigns)
      )
      .catch((err: Error) => console.log(err));
  };

  const handleUpdateCampaign = (_id: string): void => {
    updateCampaign(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Campaign not updated");
        }
        setCampaigns(data.campaigns);
      })
      .catch((error) => console.log("Error! Campaign not updated"));
  };

  return (
    <React.Fragment>
      <Title>Campaigns</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Heading</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>Goal</TableCell>
            <TableCell>Stretch</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Pledged</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((campaign: ICampaign) => (
            <TableRow key={campaign._id}>
              <TableCell>{campaign.heading}</TableCell>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>{campaign.initial_target}</TableCell>
              <TableCell>{campaign.stretch_target}</TableCell>
              <TableCell>{campaign.phone_number}</TableCell>
              {/* <TableCell>{campaign.pledged}</TableCell> */}
              <TableCell align="right">
                <Button onClick={() => handleUpdateCampaign(campaign._id)}>
                  {campaign.active ? "Deactivate" : "Activate"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default Campaigns;
