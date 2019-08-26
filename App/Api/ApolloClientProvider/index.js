import ApolloClient from 'apollo-boost';
import Constants from '../../Utils/Contants';

class ApolloClientProvider {
  constructor() {
    this.client = new ApolloClient({
      uri: Constants.BASE_URL,
    });
  }
}
export default new ApolloClientProvider();
