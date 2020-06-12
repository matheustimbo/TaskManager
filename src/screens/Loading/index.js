/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import styles from './styles';
import texts from '../../utils/texts';
import colors from '../../utils/colors';
import {setCustomText} from 'react-native-global-props';
import {FirebaseContext} from '../../providers/FirebaseProvider';

const Loading = props => {
  const context = useContext(FirebaseContext);

  const handleNavigation = async () => {
    let currentUser = auth().currentUser;
    if (currentUser) {
      database()
        .ref(`users/${auth().currentUser.uid}`)
        .once('value')
        .then(snapshot => {
          context.setUser(snapshot.val());
          context.listenToUser();
          context.listenToTasks();
          props.navigation.navigate('TasksList');
        });
    } else {
      props.navigation.navigate('Login');
    }
  };

  useEffect(async () => {
    const customTextProps = {
      style: {
        color: colors.darkBlue,
        fontFamily: 'Poppins-Regular',
      },
    };
    setCustomText(customTextProps);
    await handleNavigation();
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.splashTxt}>{texts.splashName}</Text>
    </View>
  );
};

export default Loading;
