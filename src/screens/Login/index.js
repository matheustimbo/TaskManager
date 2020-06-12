import React, {useState, useContext} from 'react';
import {View, Text, TextInput} from 'react-native';
import Touchable from '../../components/Touchable';
import styles from './styles';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import texts from '../../utils/texts';
import colors from '../../utils/colors';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {FirebaseContext} from '../../providers/FirebaseProvider';

const Login = props => {
  const context = useContext(FirebaseContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passVisible, setPassVisible] = useState(false);

  const handleLoginPress = async () => {
    setError('');
    if (email == '') {
      return setError(texts.writeEmail);
    }
    if (password == '') {
      return setError(texts.writePassword);
    }
    setLoading(true);
    await auth()
      .signInWithEmailAndPassword(email.trim(), password.trim())
      .then(() => {
        database()
          .ref(`users/${auth().currentUser.uid}`)
          .once('value')
          .then(snapshot => {
            context.setUser(snapshot.val());
            context.listenToUser();
            context.listenToTasks();
            props.navigation.navigate('TasksList');
          });
      })
      .catch(error => {
        console.log(error);
        console.log(error.code);
        if (error.code === 'auth/email-already-in-use') {
          console.log('a');
          setError(texts.emailInUse);
        }

        if (error.code === 'auth/invalid-email') {
          console.log('b');
          setError(texts.emailInvalid);
        }
        setLoading(false);
      });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.screenContent}>
        <Text style={styles.title}>{texts.loginTitle}</Text>
        <TextInput
          value={email}
          placeholder="Seu email"
          onChangeText={pEmail => setEmail(pEmail)}
          style={styles.textInput}
          autoCapitalize="none"
        />

        <View style={styles.inputContainer}>
          <TextInput
            value={password}
            placeholder="Sua senha"
            onChangeText={pPassword => setPassword(pPassword)}
            secureTextEntry={!passVisible}
            style={[styles.textInput, {marginTop: 0}]}
          />
          <View style={styles.iconPositioner}>
            <Touchable onPress={() => setPassVisible(!passVisible)}>
              <Icon
                name={passVisible ? 'visibility' : 'visibility-off'}
                size={32}
                color={colors.black}
              />
            </Touchable>
          </View>
        </View>

        <Text style={styles.error}>{error}</Text>
        <Button
          loading={loading}
          style={styles.button}
          text={texts.login}
          textStyle={styles.buttonText}
          onPress={() => handleLoginPress()}
        />
      </View>

      <Touchable
        onPress={() => props.navigation.navigate('SignUp')}
        style={styles.signUpButton}>
        <Text style={styles.signUpText}>{texts.goToSignUp}</Text>
      </Touchable>
    </View>
  );
};

export default Login;
