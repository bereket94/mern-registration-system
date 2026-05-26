import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.login}>
          <Text style={styles.title}>LOGIN</Text>
          <TextInput style={styles.input} placeholder="Username" />
          <TextInput style={styles.input} placeholder="Password" />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex:1,
      alignItems: 'center',
       justifyContent: 'center',
        backgroundColor: '#adb8b5',
     },
     login:{
        marginTop:30,
        width:'30%', 
        padding:60,
        borderRadius:10,
        backgroundColor: '#2d4742',
        alignItems: 'center',
        justifyContent: 'center',
     },
  title: { 
    fontSize: 35, 
    fontWeight: 'bold',
     color: '#ffffff',
      marginBottom: 20 
    },
  input: {
    width: '95%',
    height: 40,
    backgroundColor: '#686249',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 20,
  },
  button: { 
     width: '95%', 
     height: 40,
     backgroundColor: '#bb50e6', 
     justifyContent: 'center', 
     alignItems: 'center',
     borderRadius: 8
 },
  buttonText: { 
    color: '#fff', 
    fontSize: 22, 
    fontWeight: 'bold'
 },
});