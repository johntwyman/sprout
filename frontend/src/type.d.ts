// Data model typing
interface IPledge {
  _id: string,
  raw: string,
  receivedAt: string,
  number: string,
  amount: number,
  name: string,
  campaign_name: string,
}

interface PledgeProps {
  pledge: IPledge,
}

type PledgeContextType = {
  pledges: IPledge[],
  setPledges: React.Dispatch<React.SetStateAction<IPledge[]>>,
}

type CampaignContextType = {
  campaign: ICampaign,
  setCampaign: React.Dispatch<React.SetStateAction<ICampaign>>,
}

interface ICampaign {
  _id: string,
  name: string,
  heading: string,
  initial_target: number,
  stretch_target: number,
  phone_number: string,
  sms_autoresponse: string,
  active: boolean
}

interface CampaignProps {
  campaign: ICampaign,
}

// Api data typing
type ApiPledgeData = {
  message: string,
  status: string,
  pledges: IPledge[],
  pledge?: IPledge,
}

type ApiCampaignData = {
  message: string,
  status: string,
  campaigns: ICampaign[],
  campaign?: ICampaign,
}

// UI component typing
interface TitleProps {
  children?: React.ReactNode;
}