import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image,
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
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';

const CreateTask = props => {
  const context = useContext(FirebaseContext);

  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(texts.sports);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [addCategoryVisible, setAddCategoryVisible] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    moment.locale('pt-br');
  }, []);

  const setNewDate = newDate => {
    setIsDatePickerVisible(false);
    setDate(newDate);
  };

  const createTask = async () => {
    if (!loading) {
      setError('');
      if (name == '') {
        return setError(texts.noNameError);
      }

      setLoading(true);
      const taskRef = database()
        .ref(`tasks/${auth().currentUser.uid}`)
        .push();
      var imagesUrls = [];
      for (var i = 0; i < images.length; i++) {
        const storageRef = storage().ref(
          `tasks/${auth().currentUser.uid}/${taskRef.key}/image-${i}.${
            images[i].type.split('/')[1]
          }`,
        );
        await storageRef.putFile(
          Platform.OS === 'ios' ? images[i].uri : images[i].path,
        );
        imagesUrls.push(await storageRef.getDownloadURL());
      }
      taskRef
        .set({
          name,
          date: date.valueOf(),
          description,
          category,
          done: false,
          imagesUrls,
        })
        .then(() => {
          setLoading(false);
          props.navigation.goBack();
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const addImage = () => {
    ImagePicker.showImagePicker({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImages([...images, response]);
      }
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
        {images.length > 0 && (
          <ScrollView
            horizontal
            pagingEnabled
            style={styles.previewImagesScroll}>
            {images.map(image => {
              console.log('image', image);
              return (
                <Image style={styles.previewImage} source={{uri: image.uri}} />
              );
            })}
          </ScrollView>
        )}
        <Touchable onPress={() => addImage()} style={styles.addImgBtn}>
          <Text style={styles.addImgBtnTxt}>{texts.addImage}</Text>
        </Touchable>
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
