import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import{ Button, TextInput} from 'react-native-web';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import LoginScreen from './Login';
import HomeScreen from './home';

const Stack = createNativeStackNavigator();
function Main({ navigation }) {
   return(
      <View style={styles.container}>
          <View style={styles.navBar}>
              <TouchableOpacity>
                <Text style={styles.navText} onPress={() => navigation.navigate('Home')}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                  <Text style={styles.navText} onPress={() => navigation.navigate('Login')}>Login</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.mainContent}>
              <View style={styles.left}>
                  <Text>LEFT</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.text}>Right</Text>
              </View>
          </View>
          <StatusBar style="light" />

        </View>
   )

}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:5,
    backgroundColor: '#66726d',
  },
  navBar: {
    flex: 1,
     backgroundColor: '#e2e1b7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  navText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 40,
  },
  mainContent: {
    flex: 5,
    flexDirection: 'row',
  },
  left:{
    flex:1,
  justifyContent:'center',
   backgroundColor: '#06adad',
  alignItems:'center'
},
  leftText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#170c35'
  },
  rightColumn: {
    flex: 9,
    alignItems:'center',
    backgroundColor: '#061a44',
    justifyContent: 'center',
  },
  text:{
    color:'#ffd901'
  }
});