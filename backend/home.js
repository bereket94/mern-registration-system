import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ScrollView } from 'react-native'; 
import axios from 'axios';

export default function HomeScreen({ navigation }) {
    // Form States
    const [fname, setFname] = useState("");
    const [mname, setMname] = useState("");
    const [lname, setLname] = useState("");
    const [age, setAge] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState('');
    const [selectedValue, setSelectedValue] = useState('React Native'); 
    const [image, setImage] = useState(null);
    const [comment, setComment] = useState("");
    
    
    const [reading, setReading] = useState(false);
    const [music, setMusic] = useState(false);
    const [Football, setFootball] = useState(false);

   
    const [errors, setErrors] = useState({});

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,  
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


    const validate = () => {
        let valid = true;
        let tempErrors = {};


        if (fname.trim() === "") {
            tempErrors.fname = "Name is Required";
            valid = false;
        } else if (!/^[A-Za-z]+$/.test(fname)) {
            tempErrors.fname = "Name must contain only letters";
            valid = false;
        } else if (fname.length < 3) {
            tempErrors.fname = "Name must be at least 3 characters";
            valid = false;
        }

        if (mname.trim() === "") {
            tempErrors.mname = "Name is Required";
            valid = false;
        } else if (!/^[A-Za-z]+$/.test(mname)) {
            tempErrors.mname = "Name must contain only letters";
            valid = false;
        } else if (mname.length < 3) {
            tempErrors.mname = "Name must be at least 3 characters";
            valid = false;
        }

       
        if (lname.trim() === "") {
            tempErrors.lname = "Name is Required";
            valid = false;
        } else if (!/^[A-Za-z]+$/.test(lname)) {
            tempErrors.lname = "Name must contain only letters";
            valid = false;
        } else if (lname.length < 3) {
            tempErrors.lname = "Name must be at least 3 characters";
            valid = false;
        }

        if (age.trim() === "") {
            tempErrors.age = "Age is required";
            valid = false;
        } else if (!/^[0-9]+$/.test(age)) {
            tempErrors.age = "Age must contain only numbers";
            valid = false;
        } else if (parseInt(age) < 18 || parseInt(age) > 65) {
            tempErrors.age = "Age must be between 18 and 65";
            valid = false;    
        }

        if (id.trim() === "") {
            tempErrors.id = "ID is required";
            valid = false;
        } else if (!/^[0-9]+$/.test(id)) {
            tempErrors.id = "ID must contain only numbers";
            valid = false;
        } else if (id.length < 3) {
            tempErrors.id = "ID must be at least 3 numbers";
            valid = false;    
        }

        setErrors(tempErrors);
        return valid;
    }; 

    const handleSubmit = async () => {
        if (validate()) {
            try {
                await axios.post('http://10.194.120.122:5000/addstudent', {
                    fname,
                    mname,
                    lname,
                    age: Number(age),
                    id: Number(id),   
                    email,
                    gender,
                    department: selectedValue,
                    image,
                    comment,
                    hobbies: {
                        reading,
                        music,
                        sports: Football 
                    }
                });
                alert("Data saved Successfully to MongoDB");
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("Failed to submit form");
            }
        }
    };
    return (
        <ScrollView style={styles.scrol}>
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.title}>Student Registration Form</Text>
                    
                    <View style={styles.row}>
                        <Text style={styles.label}>First Name:</Text>
                        <TextInput value={fname} onChangeText={setFname} style={styles.input} placeholder="First Name"/>
                        {errors.fname && <Text style={{color:'red', fontSize:12}}>{errors.fname}</Text>}
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Middle Name:</Text>
                        <TextInput value={mname} onChangeText={setMname} style={styles.input} placeholder="Middle Name"/>
                        {errors.mname && <Text style={{color:'red',fontSize:12}}>{errors.mname}</Text>}
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Last Name:</Text>
                        <TextInput value={lname} onChangeText={setLname} style={styles.input} placeholder="Last Name"/>
                        {errors.lname && <Text style={{color:'red',fontSize:12}}>{errors.lname}</Text>}
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Age:</Text>
                        <TextInput value={age} onChangeText={setAge} style={styles.input} placeholder="Enter Age" keyboardType="numeric" />
                        {errors.age && <Text style={{color:'red',fontSize:12}}>{errors.age}</Text>}
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>ID:</Text>
                        <TextInput value={id} onChangeText={setId} style={styles.input} placeholder="Enter ID" keyboardType="numeric"/>
                        {errors.id && <Text style={{color:'red',fontSize:12}}>{errors.id}</Text>}
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Email:</Text>
                        <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Enter Email" keyboardType="email-address"/>
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.label}>Photo:</Text>
                        <Button style={styles.button} title="Upload Image" onPress={pickImage} />
                        {image && (
                            <Image source={{ uri: image }} style={{ width: 120, height:150, marginLeft:5, borderRadius:10 }} />
                        )}
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Gender:</Text>
                        <View style={styles.radioItem}>
                            <RadioButton
                                value="Male"
                                status={gender === 'Male' ? 'checked' : 'unchecked'}
                                onPress={() => setGender('Male')}
                            />
                            <Text>Male</Text>
                        </View>
                        <View style={styles.radioItem}>
                            <RadioButton
                                value="Female"
                                status={gender === 'Female' ? 'checked' : 'unchecked'}
                                onPress={() => setGender('Female')}
                            />
                            <Text>Female</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Hobbies</Text>
                        <Checkbox status={reading ? 'checked' : 'unchecked'} onPress={() => setReading(!reading)} />
                        <Text style={{marginRight: 10}}>Reading</Text>
                        
                        <Checkbox status={music ? 'checked' : 'unchecked'} onPress={() => setMusic(!music)} />
                        <Text style={{marginRight: 10}}>Music</Text>
                        
                        <Checkbox status={Football ? 'checked' : 'unchecked'} onPress={() => setFootball(!Football)} />
                        <Text>Sports</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Department:</Text>
                        <View style={styles.pickerBox}>
                            <Picker selectedValue={selectedValue} onValueChange={(itemValue) => setSelectedValue(itemValue)}>
                                <Picker.Item label="CSS" value="CSS"/>
                                <Picker.Item label="HTML" value="HTML"/>
                                <Picker.Item label="JavaScript" value="JavaScript"/>
                                <Picker.Item label="React Native" value="React Native"/>
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Comment:</Text>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Enter your comment"
                            multiline={true}
                            numberOfLines={4}
                            value={comment}
                            onChangeText={setComment}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <StatusBar style="light"/>
            </View>
        </ScrollView>   
    );
}

const styles = StyleSheet.create({
scrol:{
 flex:1
},
container:{
    flex:1,
    backgroundColor:'#dfdada',
    justifyContent:'center',
    alignItems:'center'
},

form:{
    width:'35%', 
    backgroundColor:'#c0ba8f',
    padding:30,
    borderWidth:0,
    borderRadius:10
},

title:{
    fontSize:22,
    fontWeight:'bold',
    marginBottom:20,
    textAlign:'center'
},

row:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:10
},

label:{
    width:120,
    fontSize:16,
    fontWeight:'bold'
},

input:{
    flex:1,
    height:30,
    backgroundColor:'#776f6f',
    color:'#fdfff6',
    borderRadius:8,
    paddingHorizontal:10
},

radioItem:{
    flexDirection:'row',
    alignItems:'center',
    marginRight:15
},

image:{
    width:70,
    height:75,
    borderRadius:5
},

pickerBox:{
    flex:1,
    borderWidth:0,
    borderRadius:8,
    backgroundColor:'#c2c1a6',
    height:30,
    justifyContent:'center'
},
commentInput:{
flex:1,
height:60,
backgroundColor:'#686666',
color:'#fff',
borderRadius:8,
paddingHorizontal:10,
paddingTop:8,
textAlignVertical:'top'
},

button:{
    width:'100%',
    height:40,
    backgroundColor:'#b95ddd',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:8,
    marginTop:5
},

buttonText:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold'
}
});