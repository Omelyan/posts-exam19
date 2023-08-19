import * as React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import store from './redux/store';
import {
  PostListScreen,
  PostScreen,
  RootStackParamList,
  rootStackNavigationOptions,
} from './screens';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={rootStackNavigationOptions}>
          <RootStack.Screen name="PostList" component={PostListScreen} />
          <RootStack.Screen name="Post" component={PostScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
