import React, {useState} from 'react';
import {View, Text, TextInput, Modal, Dimensions} from 'react-native';
import texts from '../utils/texts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../utils/colors';
import Touchable from './Touchable';
import Button from './Button';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');

const AddCategoryModal = props => {
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const createNewCategory = () => {
    if (newCategory.trim() == '') {
      props.onClose();
    }
    setLoading(true);
    const categoriesRef = database().ref(
      `users/${auth().currentUser.uid}/categories`,
    );
    categoriesRef.once('value').then(snapshot => {
      let currentCategories = snapshot.val();
      currentCategories.push(newCategory.trim().toUpperCase());
      categoriesRef.set(currentCategories).then(() => {
        setLoading(false);
        props.onClose();
        setNewCategory('');
      });
    });
  };

  return (
    <Modal visible={props.visible} animationType="fade" transparent>
      <View
        style={{
          width,
          height,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: width * 0.8,
            backgroundColor: colors.skin,
            borderRadius: 12,
            padding: 32,
          }}>
          <Touchable onPress={props.onClose} style={{alignSelf: 'flex-start'}}>
            <Icon name="close" size={32} color={colors.darkBlue} />
          </Touchable>
          <Text
            style={{
              fontSize: 16,
              marginTop: 8,
              fontFamily: 'Poppins-SemiBold',
              color: colors.secondaryDarkBlue,
            }}>
            {texts.newCategory}
          </Text>
          <TextInput
            style={{
              height: 40,
              borderBottomWidth: 1,
              borderColor: colors.darkBlue,
              fontSize: 18,
              marginBottom: 16,
              paddingBottom: 8,
              marginTop: 8,
            }}
            placeholder={texts.newCategory}
            value={newCategory}
            onChangeText={text => setNewCategory(text)}
          />
          <Button
            onPress={() => createNewCategory()}
            loading={loading}
            style={{
              width: width * 0.6,
              height: 50,
              backgroundColor: colors.blue,
              borderRadius: 16,
            }}
            text={texts.addCategory}
            textStyle={{
              fontSize: 18,
              fontFamily: 'Poppins-Bold',
              color: colors.white,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddCategoryModal;
