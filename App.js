import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet} from 'react-native';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import CreateList from './screens/CreateList';
import Profile from './screens/Profile';
import Stats from './screens/Stats';
import Profile_Button from './components/profile_button';
import Stats_Button from './components/stats_button';
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
              options={({ navigation }) => ({
                headerTitle: '',
                headerBackground: () => (
                  <LinearGradient
                    colors={['#b45eff', '#8469ff', '#6490fe', '#4cacfd']} // Colores del degradado
                    start={{ x: 1, y: 0 }}          // Comienza desde la izquierda
                    end={{ x: 0, y: 0 }}
                    style={{ flex: 1 }}
                  />),
                headerLeft: () => (
                  <Profile_Button onPress={() => navigation.navigate('Profile')}/>
                ),
                headerRight: () => (
                  <Stats_Button onPress={() => navigation.navigate('Stats')}/>
                ),
              })}
            />

            <Stack.Screen
             name="Create List"
             component={CreateList}
             options={{
              headerTitle: '',
              headerBackground: () => (
                <LinearGradient
                  colors={['#b45eff', '#8469ff', '#6490fe', '#4cacfd']} // Colores del degradado
                  start={{ x: 1, y: 0 }}          // Comienza desde la izquierda
                  end={{ x: 0, y: 0 }}
                  style={{ flex: 1 }}
                />),
             }}
            />

            <Stack.Screen
             name="Profile"
             component={Profile}
             options={{
              headerTitle: '',
              headerBackground: () => (
                <LinearGradient
                  colors={['#b45eff', '#8469ff', '#6490fe', '#4cacfd']} // Colores del degradado
                  start={{ x: 1, y: 0 }}          // Comienza desde la izquierda
                  end={{ x: 0, y: 0 }}
                  style={{ flex: 1 }}
                />),
             }}
            />

            <Stack.Screen
             name="Stats"
             component={Stats}
             options={{
              headerTitle: '',
              headerBackground: () => (
                <LinearGradient
                  colors={['#b45eff', '#8469ff', '#6490fe', '#4cacfd']} // Colores del degradado
                  start={{ x: 1, y: 0 }}          // Comienza desde la izquierda
                  end={{ x: 0, y: 0 }}
                  style={{ flex: 1 }}
                />),
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

})