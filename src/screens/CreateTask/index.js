import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Touchable from '../../components/Touchable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../utils/colors';
import texts from '../../utils/texts';
import {FirebaseContext} from '../../providers/FirebaseProvider';
import moment from 'moment';
import 'moment/locale/pt-br';
import AddCategoryModal from '../../components/AddCategoryModal';
import CategoryButton from '../../components/CategoryButton';
import styles from './styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Button from '../../components/Button';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const CreateTask = props => {
  const context = useContext(FirebaseContext);

  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(texts.sports);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [addCategoryVisible, setAddCategoryVisible] = useState(false);

  useEffect(() => {
    moment.locale('pt-br');
  }, []);

  const setNewDate = newDate => {
    setIsDatePickerVisible(false);
    setIsTimePickerVisible(false);
    setDate(newDate);
  };

  const createTask = () => {
    setError('');
    if (name == '') {
      return setError(texts.noNameError);
    }

    setLoading(true);
    database()
      .ref(`tasks/${auth().currentUser.uid}`)
      .push({
        name,
        date: date.valueOf(),
        description,
        category,
        done: false,
      })
      .then(() => {
        setLoading(false);
        props.navigation.goBack();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <Touchable
          onPress={() => props.navigation.goBack()}
          style={styles.backBtn}>
          <Icon name="chevron-left" size={32} color={colors.darkBlue} />
        </Touchable>
        <Text style={styles.title}>{texts.createNewTask}</Text>
        <Text style={styles.label}>{texts.taskName}</Text>
        <TextInput
          style={styles.textinput}
          placeholder={texts.taskName}
          value={name}
          onChangeText={text => setName(text)}
        />

        <Text style={styles.label}>{texts.taskDate}</Text>
        <View style={styles.dateButtonsRow}>
          <Touchable
            style={styles.dateButton}
            onPress={() => setIsDatePickerVisible(true)}>
            <Text style={styles.dateTxt}>
              {moment(date).format('ddd, D MMMM') +
                texts.at +
                moment(date).format('hh:mm a')}
            </Text>
            <Icon
              name="keyboard-arrow-down"
              size={20}
              color={colors.darkBlue}
            />
          </Touchable>
          <Touchable
            style={styles.calendarButton}
            onPress={() => setIsDatePickerVisible(true)}>
            <Icon name="date-range" size={20} color={colors.white} />
          </Touchable>
        </View>
      </View>

      <KeyboardAvoidingView
        style={[styles.screen, styles.content]}
        contentContainerStyle={styles.content}>
        <Text style={styles.label}>{texts.description}</Text>
        <View>
          <TextInput
            placeholder={texts.description}
            value={description}
            onChangeText={text => setDescription(text)}
            multiline
            style={styles.multilineTextinput}
          />
        </View>
        <Text style={styles.label}>{texts.category}</Text>
        <View style={styles.categoriesContainer}>
          {context.user.categories.map(pCategory => (
            <CategoryButton
              category={pCategory}
              selected={category == pCategory}
              onPress={() => setCategory(pCategory)}
            />
          ))}
          <CategoryButton
            category={texts.addCategoryBtn}
            selected={true}
            onPress={() => setAddCategoryVisible(true)}
          />
        </View>
        <Text style={styles.error}>{error}</Text>
        <Button
          style={styles.createBtn}
          loading={loading}
          text={texts.createTask}
          textStyle={styles.createBtnTxt}
          onPress={() => createTask()}
        />
      </KeyboardAvoidingView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={'datetime'}
        onConfirm={newDate => setNewDate(newDate)}
        onCancel={() => {
          setIsDatePickerVisible(false);
          setIsTimePickerVisible(false);
        }}
        minimumDate={Date.now()}
      />
      <AddCategoryModal
        visible={addCategoryVisible}
        onClose={() => setAddCategoryVisible(false)}
      />
    </ScrollView>
  );
};

export default CreateTask;
