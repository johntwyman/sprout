interface IPledge {
  _id: string,
  raw: string,
  receivedAt: string,
  number: string,
  amount: string,
  name: string,
  campaign_name: string,
}

interface PledgeProps {
  pledge: IPledge,
}

type ApiDataType = {
  message: string,
  status: string,
  pledges: IPledge[],
  pledge?: IPledge,
}