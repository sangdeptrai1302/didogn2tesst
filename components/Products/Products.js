import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, Text } from 'react-native';

export default function Products() {
  const [games, setGames] = useState([]);
  const [numColumns, setNumColumns] = useState(2); // Thêm state cho số cột

  const getAPI = () => {
    const apiUrl = 'http://192.168.137.122:8080/api/products';

    return fetch(apiUrl)
      .then(response => response.json())
      .then((data) => setGames(data))
      .catch(error => console.log(error));
  }

  const navigation = useNavigation();

  // More details btn
  const handleMoreButton = (id) => {
    navigation.navigate('productDetails', { _id: id });
    console.log(id);
  };

  // Add to cart
  const handleAddToCart = () => {
    alert('Added to cart');
  };

  useEffect(() => {
    getAPI();
  }, []);

  const renderProduct = ({ item }) => (
    
    <View style={styles.productContainer}>
      <Image source={{ uri: item.photo }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>{`Giá: ${item.price}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        key={numColumns.toString()} // Thêm key khi thay đổi số cột
        numColumns={numColumns}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  productContainer: {
    flex: 1,
    margin: 8,
  },
  productImage: {
    width: '100%',
    height: 200, // Điều chỉnh chiều cao của ảnh
    resizeMode: 'cover',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  productDescription: {
    fontSize: 12,
    marginTop: 4,
  },
  productPrice: {
    fontSize: 12,
    marginTop: 4,
    color: 'green',
  },
});
