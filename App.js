import * as React from 'react';
import {View} from 'react-native';

import {Provider} from 'react-redux';
import {store} from './App/Redux/store';
import AppContainer from './App/Routes/index';

import {ApolloProvider} from 'react-apollo';
import ApolloClientProvider from './App/Api/ApolloClientProvider';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ApolloProvider client={ApolloClientProvider.client}>
          <Provider store={store}>
            <AppContainer />
          </Provider>
        </ApolloProvider>
      </View>
    );
  }
}
