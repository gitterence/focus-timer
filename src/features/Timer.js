import React, { useState } from 'react';
import { View, StyleSheet, Text, Platform, Vibration } from 'react-native';
import { Button, IconButton, ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { colors } from '../utils/colors';
import { spacing, fontSizes } from '../utils/sizes';
import { Countdown } from '../components/Countdown';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, focusTime, clearSubject }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(focusTime);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(0);
    // reset();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={styles.focusSubjectContainer}>
          <Text style={styles.task}>{focusSubject} </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <ProgressBar
            color={colors.progressBar}
            style={styles.progressBar}
            progress={progress}
          />
        </View>
      </View>

      <View style={styles.buttonWraper}>
        {isStarted ? (
          <IconButton
            mode="outlined"
            icon="pause"
            color="white"
            size={50}
            onPress={() => setIsStarted(false)}>
            >
          </IconButton>
        ) : (
          <IconButton
            mode="outlined"
            icon="play"
            color="white"
            size={50}
            onPress={() => setIsStarted(true)}>
            >
          </IconButton>
        )}
      </View>

      <View style={styles.clearSubjectWraper}>
        <Button mode="contained" dark="true" onPress={clearSubject}>
          End
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
  },
  countDown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusSubjectContainer: {
    paddingTop: spacing.xxl,
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: fontSizes.lg,
  },
  progressBarContainer: {
    paddingTop: spacing.md,
  },
  progressBar: {
    height: spacing.md,
    width: 250,
  },
  buttonWraper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubjectWraper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
