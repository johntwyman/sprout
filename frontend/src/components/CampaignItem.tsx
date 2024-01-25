import React from "react"

type Props = CampaignProps & {
  deleteCampaign: (_id: string) => void
}

const Campaign: React.FC<Props> = ({ campaign, deleteCampaign }) => {
  return (
    <div className="Card">
      <div className="Card--text">
        <h1>{campaign.name}</h1>
        <span>{campaign.heading}</span>
      </div>
      <div className="Card--button">
        <button
          onClick={() => deleteCampaign(campaign._id)}
          className="Card--button__delete"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Campaign