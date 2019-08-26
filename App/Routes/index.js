import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import Routes from './route';

import ArtWorkListingScreen from '../Containers/ArtWorksLisitingScreen';

const RootNavigator = createStackNavigator(
  {
    [Routes.ArtWorkListingScreen]: {
      screen: ArtWorkListingScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: Routes.ArtWorkListingScreen,
  },
);

let AppContainer = createAppContainer(RootNavigator);
export default AppContainer;
