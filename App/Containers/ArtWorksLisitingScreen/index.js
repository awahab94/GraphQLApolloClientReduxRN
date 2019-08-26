/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {gql} from 'apollo-boost';
import ArtWorkListItemCard from '../../Components/ArtWorkListItemCard';
import {SearchBar} from 'react-native-elements';
import ApolloClientProvider from '../../Api/ApolloClientProvider';
import {setSearchredArtWorks, setSearchredQuery} from '../../Redux/actions';
import {connect} from 'react-redux';

const ART_WORK_QUERY = gql`
  {
    artworks {
      id
      date
      category
      price_currency
      artist {
        name
      }
      meta {
        description
        image
        share
        title
      }
    }
  }
`;

class ArtWorkListingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artworks: [],
      fullArtWorks: [],
    };
  }

  componentDidMount = () => {
    this.fetchArtWorksData();
  };

  fetchArtWorksData = () => {
    ApolloClientProvider.client
      .query({
        query: ART_WORK_QUERY,
      })
      .then(result => {
        this.setState({
          artworks: result.data.artworks,
          fullArtWorks: result.data.artworks,
        });
      });
  };

  _listEmptyComponent = () => {
    return (
      <View>
        {this.state.query === '' ? (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator animating size="large" />
            <Text style={styles.itemText}>
              {'Please wait while data is loading!'}
            </Text>
          </View>
        ) : (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.itemText}>
              {'Data not found against this query!'}
            </Text>
          </View>
        )}
      </View>
    );
  };

  _keyExtractor = (item, index) => {
    item.id;
  };
  _renderItem = ({item, index}) => {
    return (
      <ArtWorkListItemCard
        artistName={item.artist.name}
        artworkTitle={item.meta.title}
        artworkImage={item.meta.image}
        artWorkDescription={item.meta.description}
        artWorkPrice={item.price_currency}
      />
    );
  };

  _updateSearchText = query => {
    this.setState({query: query});
    this._handleSearchQuery(query);
  };

  _handleSearchQuery = query => {
    let searchArtWorks = this.state.fullArtWorks.filter(item => {
      return (
        item.meta.title.toLowerCase().includes(query.toLowerCase()) ||
        item.artist.name.toLowerCase().includes(query.toLowerCase())
      );
    });
    this.setState({artworks: searchArtWorks});
    this.props.setSearchredQuery(query);
    this.props.setSearchredArtWorks(searchArtWorks);
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}>
          <SearchBar
            platform="ios"
            placeholder="Search here"
            onChangeText={this._updateSearchText}
            value={this.state.query}
          />

          <ScrollView style={{marginTop: 15}}>
            <FlatList
              keyExtractor={this._keyExtractor}
              data={this.state.artworks}
              renderItem={item => this._renderItem(item)}
              ListEmptyComponent={this._listEmptyComponent}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  if (state === undefined) {
    return {};
  } else {
    return {
      artworks: state.artworks,
      query: state.query,
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchredQuery: query => dispatch(setSearchredQuery(query)),
    setSearchredArtWorks: artworks => dispatch(setSearchredArtWorks(artworks)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtWorkListingScreen);
