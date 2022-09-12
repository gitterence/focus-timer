import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

export const Focus = ({ addSubject, addTime }) => {
  const [subject, setSubject] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [visible, setVisible] = useState(false);
  const [warningMsg, setWarningMsg] = useState('');

  const onDismissSnackBar = () => setVisible(false);

  const secondsToMinutes = (sec) => sec / 60;

  const isNumber = (input) => {
    if (!/^[0-9]+$/.test(input)) {
      return false;
    }
    return true;
  };

  const isValidRange = (num) => {
    if (num >= 60 || num < 0) {
      return false;
    }
    return true;
  };

  const getTotalMinutes = (min: Number, sec: Number) => {
    var time = null;

    let totalMin = parseInt(min);

    let totalSec = parseFloat(secondsToMinutes(sec));

    console.log('min:' + min);
    console.log('sec: ' + secondsToMinutes(sec));

    time = totalMin + totalSec;

    console.log('min type:' + typeof min);
    console.log('sec type:' + typeof totalSec);
    console.log(time);

    return time;
  };

  const handleOnPress = () => {
    if (!subject || !minutes || !seconds) {
      setWarningMsg('Sorry, input cannot be empty.');
      setVisible(true);
      return;
    }

    if (!isNumber(minutes) || !isNumber(seconds)) {
      setWarningMsg('Sorry, time can only be number type.');
      setVisible(true);
      return;
    }

    if (!isValidRange(minutes) || !isValidRange(seconds)) {
      setWarningMsg('Sorry, time can only be less than 60.');
      setVisible(true);
      return;
    }

    if (minutes == 0 && seconds == 0) {
      setWarningMsg('Sorry, time cannot be 0.');
      setVisible(true);
      return;
    }

    addSubject(subject);
    addTime(getTotalMinutes(minutes, seconds));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          label="What are we focusing on?"
          onChangeText={setSubject}
        />
      </View>

      <View style={styles.timeInputContainer}>
        <TextInput
          style={styles.timeInput}
          keyboardType="number-pad"
          label="Min"
          onChangeText={setMinutes}
        />

        <View>
          <Text style={styles.timeSpliter}>:</Text>
        </View>

        <TextInput
          style={styles.timeInput}
          keyboardType="number-pad"
          label="Sec"
          onChangeText={setSeconds}
        />
      </View>

      <View style={styles.button}>
        <Button mode="contained" dark="true" onPress={handleOnPress}>
          Go
        </Button>
      </View>

      <View style={styles.footerContainer}>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'ok',
            onPress: () => {
              // Do something
            },
          }}>
          {warningMsg}
        </Snackbar>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
  timeInput: {
    flex: 1,
    marginHorizontal: spacing.md,
  },
  inputContainer: {
    padding: spacing.lg,
    justifyContent: 'top',
    flexDirection: 'row',
  },
  timeInputContainer: {
    padding: spacing.md,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  timeSpliter: {
    width: 15,
    height: 60,
    color: colors.white,
    fontSize: 50,
  },
  footerContainer: {
    flex: 1,
  },
});
