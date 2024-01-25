import React from "react"

type Props = PledgeProps & {
  // updatePledge: (pledge: IPledge) => void
  deletePledge: (_id: string) => void
}

const Pledge: React.FC<Props> = ({ pledge, deletePledge }) => {
  return (
    <div className="Card">
      <div className="Card--text">
        <h1>{pledge.amount}</h1>
        <span>{pledge.name}</span>
      </div>
      <div className="Card--button">
        <button
          // onClick={() => updatePledge(pledge)}
        >
          Complete
        </button>
        <button
          onClick={() => deletePledge(pledge._id)}
          className="Card--button__delete"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Pledge