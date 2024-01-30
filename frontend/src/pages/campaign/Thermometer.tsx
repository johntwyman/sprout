import React from 'react';

type Props = {
  pledgedAmount: number;
  initialTarget: number;
  stretchTarget: number;
}

const Thermometer: React.FC<Props> = ({ pledgedAmount, initialTarget, stretchTarget }) => {
  const targetAmount = pledgedAmount > stretchTarget ? stretchTarget :
    pledgedAmount > initialTarget ? stretchTarget : initialTarget;

  return (<div />);
}

export default Thermometer;