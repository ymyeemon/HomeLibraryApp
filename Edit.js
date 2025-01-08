import React, {useState} from 'react';
import {Alert, StyleSheet, Button, Text, View, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    bottonsbox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10,
    },

    text: {
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
        padding: 10,
    },

    textinput: {
        borderWidth: 1,
        borderheight: 40,
        margin: 10,
        padding: 5,
        height: 40,
    },

    box: {
        marginTop: 200,
    },

    container: {
        backgroundColor: 'white',
        height: '100%',
    }
});

const Edit = ({navigation, route}) => {
    const [name, setName] = useState(route.params.name);
    const [isbn, setIsbn] = useState(route.params.isbn);
    const [copies, setCopies] = useState(route.params.copies);
    const [image, setImage] = useState(route.params.image);

    const setData = async (value) => {
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate("Home");
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>

            <Text style={styles.text}>Name:</Text>
            <TextInput
            value={name}
            style={styles.textinput}
            onChangeText={ (text) => setName(text)}>
            </TextInput>

            <Text style={styles.text}>ISBN:</Text>
            <TextInput
            value={isbn}
            style={styles.textinput}
            onChangeText={ (text) => setIsbn(text)}>
            </TextInput>

            <Text style={styles.text}>Copies:</Text>
            <TextInput
            value={copies}
            style={styles.textinput}
            onChangeText={ (text) => setCopies(text)}>
            </TextInput>

            <Text style={styles.text}>Image:</Text>
            <TextInput
            value={image} 
            style={styles.textinput}
            onChangeText={ (image) => setImage(image)}>
            </TextInput>

            </View>
           
            <View style={styles.bottonsbox}>
                <View style={{flex: 1, marginRight: 20}}>
                    <Button title='Save'
                    color="blue"
                    onPress={ () => {
                        let mydata = JSON.parse(route.params.datastring);
                        
                        let indexnum = 1;
                        if (route.params.type === 'Fiction') {
                            indexnum = 0;
                        }
                        if (route.params.type === 'Non-Fiction') {
                            indexnum = 1;
                        }
                        
                        mydata[indexnum].data[route.params.index].name = name;
                        mydata[indexnum].data[route.params.index].isbn = isbn;
                        mydata[indexnum].data[route.params.index].copies = copies;
                        mydata[indexnum].data[route.params.index].image = image;

                        let stringdata = JSON.stringify(mydata);
                        setData(stringdata);
                    }}/>
                </View>
                
                <View style={{flex: 1}}>
                    <Button title='Delete'
                    color="red"
                    onPress={() => {
                        let mydata = JSON.parse(route.params.datastring);

                        let indexnum = 1;
                        if (route.params.type === 'Fiction') {
                            indexnum = 0;
                        }
                        if (route.params.type === 'Non-Fiction') {
                            indexnum = 1;
                        }

                        Alert.alert("Are you sure?", '',
                        [{text: 'Yes', onPress: () => {
                            mydata[indexnum].data.splice(route.params.index, 1);
                            let stringdata = JSON.stringify(mydata);
                            setData(stringdata);
                        }},
                        {text: 'No'}]);
                    }}/>
                </View>
            </View>
        </View>
    );
};

export default Edit;