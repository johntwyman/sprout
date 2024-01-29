import { DateTime } from 'luxon';
import * as React from 'react';

import { useTheme } from '@mui/material/styles';
import { axisClasses, LineChart } from '@mui/x-charts';
import { ChartsTextStyle } from '@mui/x-charts/ChartsText';

import Title from '../../components/Title';
import { usePledgesContext } from './Context';

// Interface and function to generate chart data from pledges
interface ChartPledgeData {
  time: string;
  amount: number | null;
  [index: string]: any;
}
const chartPledgeData = (data: Pick<IPledge, "receivedAt" | "amount">[]): ChartPledgeData[] => {
  const sortedPledges = data.sort((a, b) => {
    const dateA = DateTime.fromISO(a.receivedAt);
    const dateB = DateTime.fromISO(b.receivedAt);
    return dateA.valueOf() - dateB.valueOf();
  });

  // group the data by "hh:mm"
  const groupedPledges = sortedPledges.reduce((acc, pledge) => {
    const time = DateTime.fromISO(pledge.receivedAt).setZone('local').setLocale('en-au').toFormat('hh:mm');
    const existingGroup = acc.find((group) => group.time === time);
    if (existingGroup) {
      existingGroup.amount = (existingGroup.amount ?? 0) + pledge.amount;
    } else {
      acc.push({ time, amount: pledge.amount });
    }
    return acc;
  }, [] as ChartPledgeData[]);

  // map the grouped data to a new array that has a simple accumulator
  let totalAmount = 0;
  const finalChartData = groupedPledges.map((group) => {
    totalAmount += group.amount ?? 0;
    return { time: group.time, amount: totalAmount };
  });
  return finalChartData;
}

type Props = {
  initialTarget: number;
  stretchTarget: number;
}

const Chart: React.FC<Props> = ({ stretchTarget }) => {
  const theme = useTheme();

  const { pledges } = usePledgesContext();
  const chartData = chartPledgeData(pledges);

  // Determine appropriate values for axis scales, etc.
  // - if pledge < stretch, set max to stretch
  // - if pledge > stretch, set max to pledge * 1.5
  const total = pledges.reduce((acc, pledge) => acc + pledge.amount, 0);
  const maxChartAmount = total > stretchTarget ? total * 1.5 : stretchTarget;

  return (
    <React.Fragment>
      <Title>Pledges</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={chartData}
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
              max: maxChartAmount,
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

export default Chart;