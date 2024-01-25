import React, { useState } from 'react'

type Props = {
  saveCampaign: (e: React.FormEvent, formData: ICampaign | any) => void
}

const AddCampaign: React.FC<Props> = ({ saveCampaign }) => {
  const [formData, setFormData] = useState<ICampaign | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <form className='Form' onSubmit={(e) => saveCampaign(e, formData)}>
      <div>
        <div>
          <label htmlFor='name'>Name</label>
          <input onChange={handleForm} type='text' id='name' />
        </div>
        <div>
          <label htmlFor='heading'>Heading</label>
          <input onChange={handleForm} type='text' id='heading' />
        </div>
        <div>
          <label htmlFor='initial_target'>Initial target</label>
          <input onChange={handleForm} type='text' id='initial_target' />
        </div>
        <div>
          <label htmlFor='stretch_target'>Stretch target</label>
          <input onChange={handleForm} type='text' id='stretch_target' />
        </div>
        <div>
          <label htmlFor='phone_number'>Phone number</label>
          <input onChange={handleForm} type='text' id='phone_number' />
        </div>
        <div>
          <label htmlFor='sms_autoresponse'>SMS autoresponse</label>
          <input onChange={handleForm} type='text' id='sms_autoresponse' />
        </div>
      </div>
      <button disabled={formData === undefined ? true: false} >Add Campaign</button>
    </form>
  )
}

export default AddCampaign