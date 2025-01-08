import React, {useState} from 'react';
import {StyleSheet, Button, Text, View, TextInput} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
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

const Add = ({navigation, route}) => {
    const [name, setName] = useState('');
    const [isbn, setIsbn] = useState('');
    const [copies, setCopies] = useState('');
    const [image, setImage] = useState('');
    const [type, setType] = useState('');

    // used for saving the arrary data to device memory (will be called when the Submit button is pressed)
    const setData = async (value) => {
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate("Home"); // save the JSON string data to a variable called alphadata in the device memory
    }

    return (
        <View style={styles.container}>
        <View style={styles.box}>
            <Text style={styles.text}>Name:</Text>
            <TextInput 
            style={styles.textinput}
            onChangeText={ (text) => setName(text)}>
            </TextInput>

            <Text style={styles.text}>ISBN:</Text>
            <TextInput 
            style={styles.textinput}
            onChangeText={ (text) => setIsbn(text)}>
            </TextInput>

            <Text style={styles.text}>Copies:</Text>
            <TextInput 
            style={styles.textinput}
            onChangeText={ (text) => setCopies(text)}>
            </TextInput>

            <Text style={styles.text}>Image:</Text>
            <TextInput 
            style={styles.textinput}
            onChangeText={ (image) => setImage(image)}>
            </TextInput>

            <RNPickerSelect
            onValueChange={(value) => setType(value)}
            items= {[
                {label: 'Fiction', value: 'Fiction'},
                {label: 'Non-Fiction', value: 'Non-Fiction'},
            ]}/>

            <Button title='Submit'
            color="blue"
            onPress={ () => {
                let mydata = JSON.parse(route.params.datastring);
                let item = {name: name, isbn: isbn, copies: copies, image: image};
                let indexnum = 1;
                if (type === 'Fiction') {
                    indexnum = 0;
                }
                if (type === 'Non-Fiction') {
                    indexnum = 1;
                }
                mydata[indexnum].data.push(item);
                let stringdata = JSON.stringify(mydata);
                setData(stringdata);
            }}/>
        </View>
        </View>
    );
};

export default Add;