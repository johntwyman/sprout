import React from 'react';

type ThermometerProps = {
  pledgedAmount: number;
  initialTarget: number;
  stretchTarget: number;
}

const Thermometer: React.FC<ThermometerProps> = ({ pledgedAmount, initialTarget, stretchTarget }) => {
  const targetAmount = pledgedAmount > stretchTarget ? stretchTarget :
    pledgedAmount > initialTarget ? stretchTarget : initialTarget;

  return (<div />);
}

export default Thermometer;