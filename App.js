import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import Constants from 'expo-constants';
import { colors } from './src/utils/colors';
import { Appbar } from 'react-native-paper';
import { Focus } from './src/features/Focus';
import { Timer } from './src/features/Timer';

export default function App() {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    if (!currentSubject) setCurrentTime(null);
  }, [currentSubject]);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Focus Timer" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      {!currentSubject ? (
        <Focus addSubject={setCurrentSubject} addTime={setCurrentTime} />
      ) : (
        <Timer
          focusSubject={currentSubject}
          focusTime={currentTime}
          onTimerEnd={() => {}}
          clearSubject={() => setCurrentSubject(null)}
          clearTime={() => setCurrentTime(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 10,
    backgroundColor: colors.darkBlue,
  },
});
