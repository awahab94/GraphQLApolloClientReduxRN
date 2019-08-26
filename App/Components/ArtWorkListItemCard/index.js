import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';

class ArtWorkListItemCard extends React.PureComponent {
  render() {
    const {
      artistName,
      artworkTitle,
      artworkImage,
      artWorkDescription,
      artWorkPrice,
    } = this.props;
    return (
      <Card style={styles.container}>
        <Card.Title title={artistName} subtitle={artWorkPrice} />
        <Card.Content>
          <Title>{artworkTitle}</Title>
          <Paragraph>{artWorkDescription}</Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: artworkImage}} />
      </Card>
    );
  }
}

export default ArtWorkListItemCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
