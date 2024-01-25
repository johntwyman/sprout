import React, { useState } from 'react'

type Props = {
  savePledge: (e: React.FormEvent, formData: IPledge | any) => void
}

const AddPledge: React.FC<Props> = ({ savePledge }) => {
  const [formData, setFormData] = useState<IPledge | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <form className='Form' onSubmit={(e) => savePledge(e, formData)}>
      <div>
        <div>
          <label htmlFor='raw'>Raw</label>
          <input onChange={handleForm} type='text' id='raw' />
        </div>
        <div>
          <label htmlFor='receivedAt'>Received At</label>
          <input onChange={handleForm} type='text' id='receivedAt' />
        </div>
        <div>
          <label htmlFor='number'>Number</label>
          <input onChange={handleForm} type='text' id='number' />
        </div>
        <div>
          <label htmlFor='amount'>Amount</label>
          <input onChange={handleForm} type='text' id='amount' />
        </div>
        <div>
          <label htmlFor='name'>Name</label>
          <input onChange={handleForm} type='text' id='name' />
        </div>
        <div>
          <label htmlFor='campaign_name'>Campaign name</label>
          <input onChange={handleForm} type='text' id='campaign_name' />
        </div>
      </div>
      <button disabled={formData === undefined ? true: false} >Add Pledge</button>
    </form>
  )
}

export default AddPledge