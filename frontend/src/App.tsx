import React, { useEffect, useState } from 'react';
import PledgeItem from './components/PledgeItem';
import AddPledge from './components/AddPledge';
import { getPledges, addPledge, deletePledge } from './api';

const App: React.FC = () => {
  const [pledges, setPledges] = useState<IPledge[]>([]);

  useEffect(() => {
    fetchPledges()
  }, []);

  const fetchPledges = (): void => {
    getPledges()
    .then(({ data: { pledges } }: IPledge[] | any) => setPledges(pledges))
    .catch((err: Error) => console.log(err));
  }

const handleSavePledge = (e: React.FormEvent, formData: IPledge): void => {
  e.preventDefault();
  addPledge(formData).then(({ status, data }) => {
    if (status !== 201) {
      throw new Error('Error! Pledge not saved')
    }
    setPledges(data.pledges)
  })
  .catch((err) => console.log(err))
}

// const handleUpdatePledge = (pledge: IPledge): void => {
//   updatePledge(pledge).then(({ status, data }) => {
//       if (status !== 200) {
//         throw new Error('Error! Pledge not updated')
//       }
//       setPledges(data.pledges)
//     })
//     .catch((error) => console.log("Error! Pledge not updated"))
// }

  const handleDeletePledge = (_id: string): void => {
    deletePledge(_id).then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Pledge not deleted')
        }
        setPledges(data.pledges)
      })
      .catch((error) => console.log("Error! Pledge not deleted"))
  }

  return (
    <main className='App'>
      <h1>My Pledges</h1>
      <AddPledge savePledge={handleSavePledge} />
      {pledges.map((pledge: IPledge) => (
        <PledgeItem
          key={pledge._id}
          // updatePledge={handleUpdatePledge}
          deletePledge={handleDeletePledge}
          pledge={pledge}
        />
      ))}
    </main>
  )
}

export default App