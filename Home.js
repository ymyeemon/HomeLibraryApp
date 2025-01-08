import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, Image, View, Button, TouchableOpacity, SectionList } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    borderWidth: 1,
    margin: 10,
  },

  buttonContainer: {
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    borderWidth: 1,
  },

  textStyle: {
    fontSize: 15,
    margin: 10,
    fontWeight: 'bold',
  },

  box: {
    margin: 11,
    borderWidth: 1,
    height: 400,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },

  image: {
    objectFit: 'fit',
    width: 150,
    height: 250,
    marginTop: 120,
    marginBottom: 120,
  }
});

const Home = ({navigation}) => {

  const [mydata, setMydata] = useState([]);

  const getData = async () => {
    let datastr = await AsyncStorage.getItem('alphadata');
    if (datastr !== null) {
      jsondata = JSON.parse(datastr);
      setMydata(jsondata);
    }
    else {
      setMydata(datasource);
    }
  };

  getData();

  const renderItem = ({item, index, section}) => {
    return (
      <TouchableOpacity
      onPress={ () => 
        {
          let dasastr = JSON.stringify(mydata);
          navigation.navigate("Edit", {datastring: dasastr, index: index, type: section.title, name: item.name, isbn: item.isbn, copies: item.copies, image: item.image});
        }
      }>
        <View style={styles.box}>
          <Image source={{uri: item.image}} style={styles.image} />
          <View>
            <Text style={styles.textStyle}>{item.name}</Text>
            <Text style={styles.textStyle}>ISBN: {item.isbn}</Text>
            <Text style={styles.textStyle}>Copies Owned: {item.copies}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <StatusBar hidden={true} />
      <View style={styles.buttonContainer}>
        <Button 
        title="Add Book"
        color="blue"
        onPress={() => {
          let datastr = JSON.stringify(mydata);
          navigation.navigate("Add", {datastring: datastr});
          }
        }></Button>
      </View>

      <SectionList contentContainerStyle={{padding: 10, margin: 10, height: 5000}} 
      sections={mydata}
      renderItem={renderItem} 
      renderSectionHeader={({section:{icon, title, backgroundColor}}) => (
        <Icon name={icon} style={[styles.headerText, {backgroundColor:backgroundColor}]}>
          <Text> {title}</Text>
        </Icon>
      )}/>
    </View>
  );
}

export default Home;