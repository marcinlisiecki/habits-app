import React, { FunctionComponent } from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface Props {
  segments: number;
  labels: any[];
  datasets: any[];
}

const CustomLineChart: FunctionComponent<Props> = ({ segments, labels, datasets }) => {
  return (
    <LineChart
      fromZero
      data={{
        labels: labels,
        datasets: datasets,
      }}
      formatYLabel={(yValue) => yValue}
      height={200}
      width={Dimensions.get('window').width}
      chartConfig={{
        backgroundColor: '#0B0E11',
        backgroundGradientFrom: '#0B0E11',
        backgroundGradientTo: '#0B0E11',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(106, 223, 166, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '4',
          strokeWidth: '2',
          stroke: '#6ADFA6',
          fill: '#6ADFA6',
        },
      }}
      bezier
      segments={segments}
      style={{
        margin: 0,
        padding: 0,
        marginLeft: -30,
        marginBottom: 50,
      }}
    />
  );
};

export default CustomLineChart;
