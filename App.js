import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import TaskListScreen from './src/screens/TaskListScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TaskListScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App; 