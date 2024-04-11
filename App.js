import { SafeAreaView, StyleSheet } from 'react-native';
import CategoryComponent from './screens/CategoryScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CategoryComponent />
    </SafeAreaView>
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
