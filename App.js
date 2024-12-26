import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet} from 'react-native';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Constants from 'expo-constants';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
              name="Login" 
              component={Login} 
              options={{headerShown: false}}
            />
            
            <Stack.Screen 
              name="Register" 
              component={Register}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: '',
                headerBackground: () => (
                  <LinearGradient
                    colors={['#b45eff', '#8469ff', '#6490fe', '#4cacfd']} // Colores del degradado
                    start={{ x: 1, y: 0 }}          // Comienza desde la izquierda
                    end={{ x: 0, y: 0 }}
                    style={{ flex: 1 }}
                  />),
                headerLeft: () => (
                  <Pressable style={styles.profile}>
                    <FontAwesome6 name="circle-user" size={35} color="black" />
                  </Pressable>
                ),
                headerRight: () => (
                  <Pressable style={styles.stats}>
                    <FontAwesome6 name="chart-line" size={35} color="black" />
                  </Pressable>
                ),
                }}
            />


        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  template:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },

  profile:{
    width: 50,
    height: 50,
    //position: 'absolute',
    top: 5,
    left: 15, // Distancia desde la izquierda
  },

  stats:{
    width: 35,
    height: 50,
    //position: 'absolute',
    top: 5,
    right: 15, // Distancia desde la izquierda
  }
})