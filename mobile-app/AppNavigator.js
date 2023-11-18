import { createStackNavigator } from '@react-navigation/stack';
import Searchbar from './components/searchbar';
import SongDetails from './components/songdetails';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Searchbar" component={Searchbar} />
    <Stack.Screen name="SongDetails" component={SongDetails} />
  </Stack.Navigator>
);

export default AppNavigator;
