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
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {HomeScreenNavigationProp, HomeScreenRouteProp} from '../navigation';
import request from 'superagent';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CryptoData {
  symbol: string;
  name: string;
  pair: string;
  icon: string;
  taker_fee: number;
  maker_fee: number;
  min_symbol_transaction: number;
  min_pair_transaction: number;
  min_sell_huobi: number;
  price_precision: number;
  quantity_precision: number;
  vol: number;
  low: number;
  high: number;
  price: number;
  change: string;
  volume_coin: string;
}

const HomeScreen: React.FC<{
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}> = ({navigation, route}) => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredCryptos, setFilteredCryptos] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const isAuthenticated = route?.params?.isAuthenticated;
    if (!isAuthenticated) {
      navigation.navigate('Login');
    }
    fetchData();
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();

      Alert.alert(
        'Confirm Exit',
        'Are you sure you want to leave this screen?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              unsubscribe();
            },
          },
          {
            text: 'OK',
            onPress: () => {
              unsubscribe();
              navigation.navigate('Login');
            },
          },
        ],
        {onDismiss: () => unsubscribe()},
      );
    });
    return () => unsubscribe();
  }, [navigation, route?.params?.isAuthenticated]);

  useEffect(() => {
    const filtered = cryptos.filter(
      crypto =>
        crypto.name.toLowerCase().includes(searchText.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredCryptos(filtered);
  }, [searchText, cryptos]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await request.get('https://www.jsonkeeper.com/b/DCQG');
      if (response.body) {
        setCryptos(response.body.data);
        setFilteredCryptos(response.body.data);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e, 'error get');
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg-home.png')}
      style={styles.imageContainer}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari Aset"
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
          <Icon
            name="search"
            size={15}
            color="#8D93A6"
            style={styles.searchIcon}
          />
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#000000" />
        ) : (
          <FlatList
            data={filteredCryptos}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Detail', {
                    isAuthenticated: route?.params?.isAuthenticated,
                    name: item.name,
                    symbol: item.symbol,
                    pair: item.pair,
                    icon: item.icon,
                    taker_fee: item.taker_fee,
                    maker_fee: item.maker_fee,
                    min_pair_transaction: item.min_symbol_transaction,
                    min_symbol_transaction: item.min_symbol_transaction,
                    min_sell_huobi: item.min_sell_huobi,
                    price_precision: item.price_precision,
                    quantity_precision: item.quantity_precision,
                    vol: item.vol,
                    low: item.low,
                    high: item.high,
                    price: item.price,
                    change: item.change,
                    volume_coin: item.volume_coin,
                  })
                }
                style={styles.cryptoItem}>
                <Image style={styles.cryptoIcon} source={{uri: item.icon}} />
                <View style={styles.cryptoInfo}>
                  <Text style={styles.title}>
                    {item.symbol} / {item.pair}
                  </Text>
                  <Text style={styles.price}>
                    {item.pair} {item.price}
                  </Text>
                  <Text style={styles.volumeCoin}>Vol {item.volume_coin}</Text>
                </View>
                <View
                  style={[
                    styles.tag,
                    {
                      backgroundColor: item.change.includes('-')
                        ? '#F35242'
                        : '#24A959',
                    },
                  ]}>
                  <Text style={styles.tagText}>{item.change}%</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 45,
  },
  imageContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    backgroundColor: '#DFDFDF',
    marginBottom: 45,
  },
  searchIcon: {
    padding: 10,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  cryptoItem: {
    height: 86,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(240,240,240,1)',
  },
  cryptoIcon: {
    width: 33,
    height: 33,
    marginRight: 10,
    alignSelf: 'flex-start',
  },
  cryptoInfo: {
    flex: 1,
    fontFamily: 'Poppins',
  },
  title: {
    color: '#6E7499',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.32,
    fontWeight: '500',
  },
  price: {
    color: '#605757',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.32,
    fontWeight: '500',
  },
  volumeCoin: {
    color: '#24A959',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  tag: {
    height: 27,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    justifyContent: 'center',
  },
  tagText: {
    color: 'white',
  },
});

export default HomeScreen;
