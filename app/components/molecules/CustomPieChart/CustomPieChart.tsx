import React, { FunctionComponent } from 'react';
import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

interface Props {
  data: object[];
}

const CustomPieChart: FunctionComponent<Props> = ({ data }) => {
  return (
    <PieChart
      data={data}
      width={Dimensions.get('window').width}
      height={200}
      accessor={'count'}
      backgroundColor={'transparent'}
      paddingLeft={'0'}
      chartConfig={{
        backgroundColor: '#0B0E11',
        backgroundGradientFrom: '#0B0E11',
        backgroundGradientTo: '#0B0E11',
        color: (opacity = 1) => `rgba(106, 223, 166, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
      style={{ marginBottom: 40 }}
    />
  );
};

export default CustomPieChart;
