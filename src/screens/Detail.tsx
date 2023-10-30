import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ImageBackground,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import {DetailScreenNavigationProp, DetailScreenRouteProp} from '../navigation';
import request from 'superagent';
import Icon from 'react-native-vector-icons/FontAwesome';

const DetailScreen: React.FC<{
  navigation: DetailScreenNavigationProp;
  route: DetailScreenRouteProp;
}> = ({navigation, route}) => {
  const {icon, symbol, pair, price, name, volume_coin, low, high, change} =
    route?.params;
  return (
    <ImageBackground
      source={require('../../assets/images/bg-home.png')}
      style={styles.imageContainer}>
      <View style={styles.container}>
        <View style={styles.imageCoinContainer}>
          <Image style={styles.imageCoin} source={{uri: icon}} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Name</Text>
            <Text style={styles.text}>{name}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Symbol</Text>
            <Text style={styles.text}>{symbol}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Price</Text>
            <Text style={styles.text}>
              {pair} {price}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Volume Coin</Text>
            <Text style={styles.text}>{volume_coin}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>LOW</Text>
            <Text style={styles.text}>{low}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>HIGH</Text>
            <Text style={styles.text}>{high}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Change</Text>
            <Text style={styles.text}>{change}%</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'gray',
  },
  imageContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  imageCoinContainer: {
    alignSelf: 'center',
  },
  imageCoin: {
    width: 60,
    height: 60,
  },
  infoContainer: {
    flexDirection: 'column',
  },
  textContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
  },
  text: {
    color: '#000',
  },
});

export default DetailScreen;
