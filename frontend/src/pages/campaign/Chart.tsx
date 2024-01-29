import { DateTime } from 'luxon';
import * as React from 'react';

import { useTheme } from '@mui/material/styles';
import { axisClasses, LineChart } from '@mui/x-charts';
import { ChartsTextStyle } from '@mui/x-charts/ChartsText';

import Title from '../../components/Title';
import { usePledgesContext } from './Context';

// Generate Sales Data
function createData(
  time: string,
  amount?: number,
): { time: string; amount: number | null } {
  return { time, amount: amount ?? null };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00'),
];

interface ChartPledgeData {
  time: string;
  amount: number | null;
}

const chartPledgeData = (data: Pick<IPledge, "receivedAt" | "amount">[]): ChartPledgeData[] => {
  const sortedPledges = data.sort((a, b) => {
    const dateA = DateTime.fromISO(a.receivedAt);
    const dateB = DateTime.fromISO(b.receivedAt);
    return dateA.valueOf() - dateB.valueOf();
  });
  return sortedPledges.map((pledge) => {
    const dateTime = DateTime.fromISO(pledge.receivedAt);
    const localDateTime = dateTime.setZone('local').setLocale('en-au');
    const formattedTime = localDateTime.toFormat('hh:mm');

    return {
      time: formattedTime,
      amount: pledge.amount,
    }
  });
}

export default function Chart() {
  const theme = useTheme();

  const { pledges } = usePledgesContext();
  // construct chart data
  // set axis scales appropriately
  // - if pledge < stretch, set max to stretch
  // - if pledge > stretch, set max to pledge * 1.5

  return (
    <React.Fragment>
      <Title>Pledges</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={chartPledgeData(pledges)}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'time',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
            },
          ]}
          yAxis={[
            {
              label: 'Amount ($)',
              labelStyle: {
                ...(theme.typography.body1 as ChartsTextStyle),
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
              max: 2500,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}