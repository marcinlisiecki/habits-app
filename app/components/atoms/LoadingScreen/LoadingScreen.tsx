import React, { FunctionComponent } from 'react';
import { ActivityIndicator, View } from 'react-native';

interface OwnProps {}

type Props = OwnProps;

const LoadingScreen: FunctionComponent<Props> = (props) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <ActivityIndicator color={'#40D68D'} size={'large'} />
    </View>
  );
};

export default LoadingScreen;
