import React, {useState, useContext} from 'react';
import {View, Text, TextInput} from 'react-native';
import {FirebaseContext} from '../../providers/FirebaseProvider';
import Button from '../../components/Button';
import texts from '../../utils/texts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import colors from '../../utils/colors';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Touchable from '../../components/Touchable';

const SignUp = props => {
  const context = useContext(FirebaseContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passVisible, setPassVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUpPress = async () => {
    setError('');
    if (name == '') {
      return setError(texts.writeName);
    }

    if (email == '') {
      return setError(texts.writeEmail);
    }

    if (password == '') {
      return setError(texts.writePassword);
    }
    setLoading(true);
    await auth()
      .createUserWithEmailAndPassword(email.trim(), password.trim())
      .then(async () => {
        console.log('User account created & signed in!');
        await database()
          .ref(`users/${auth().currentUser.uid}`)
          .set({
            name,
            email,
            categories: [
              texts.sports,
              texts.health,
              texts.finances,
              texts.fun,
              texts.educational,
              texts.homework,
            ],
          });
        setLoading(false);
        setName('');
        setEmail('');
        setPassword('');
        context.listenToUser();
        props.navigation.navigate('TasksList');
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
      <Text style={styles.title}>{texts.signUpTitle}</Text>
      <TextInput
        value={name}
        placeholder="Seu nome"
        onChangeText={pName => setName(pName)}
        style={styles.textInput}
      />
      <TextInput
        value={email}
        placeholder="Seu email"
        onChangeText={pEmail => setEmail(pEmail)}
        style={styles.textInput}
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
        text={texts.signUp}
        textStyle={styles.buttonText}
        onPress={() => handleSignUpPress()}
      />
      <Touchable
        onPress={() => props.navigation.navigate('Login')}
        style={styles.loginButton}>
        <Text style={styles.loginText}>{texts.goToLogin}</Text>
      </Touchable>
    </View>
  );
};

export default SignUp;
