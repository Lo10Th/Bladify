import { StyleSheet, Text, View } from 'react-native';
import { Searchbar } from './components/searchbar';

export default function App() {
  return (
    <View style={styles.container}>
      <Searchbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
