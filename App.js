import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import {NavigationContainer} from '@react-navigation/native';

import UserContextProvider from './src/contexts/UserContext';
import MainStack from './src/stacks/MainStack';

export default () => {

  return (
    <UserContextProvider>
      <RootSiblingParent>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </RootSiblingParent>
    </UserContextProvider>
  );
}