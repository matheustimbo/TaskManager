import React, {useContext} from 'react';
import {View, Text, FlatList, BackHandler, Image} from 'react-native';
import {FirebaseContext} from '../../providers/FirebaseProvider';
import texts from '../../utils/texts';
import colors from '../../utils/colors';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Touchable from '../../components/Touchable';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';

const TasksList = props => {
  const context = useContext(FirebaseContext);
  const {user} = context;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const TaskItem = task => {
    return (
      <Touchable style={styles.taskContainer}>
        {task.imagesUrls?.length > 0 ? (
          <Image style={styles.taskImage} source={{uri: task.imagesUrls[0]}} />
        ) : (
          <View style={styles.imageReplacement}>
            <Text style={styles.imageReplacementTxt}>
              {task.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={styles.taskBody}>
          <View>
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={styles.taskName}>
              {task.name}
            </Text>
            <Text style={styles.taskDate}>
              {moment(task.date).format('DD/MM') +
                texts.at +
                moment(task.date).format('hh:mm a')}
            </Text>
          </View>
        </View>
        <CheckBox
          value={task.done}
          onValueChange={() => context.toggleTaskDone(task.key)}
        />
      </Touchable>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.buttonsRow}>
          <Touchable>
            <Icon name="person" size={32} color={colors.darkBlue} />
          </Touchable>
          <Touchable>
            <Icon name="search" size={32} color={colors.darkBlue} />
          </Touchable>
        </View>
        <Text style={styles.hello}>
          {texts.hello}
          <Text style={styles.userName}>{user.name}</Text>
        </Text>
      </View>
      <View style={styles.listHeaderRow}>
        <Text style={styles.tasksTitle}>{texts.myTasks}</Text>
        <Touchable
          style={styles.addTaskBtn}
          onPress={() => props.navigation.navigate('CreateTask')}>
          <Text style={styles.add}>{texts.newTask}</Text>
        </Touchable>
      </View>
      <FlatList
        data={context.tasks}
        renderItem={({item}) => TaskItem(item)}
        keyExtractor={task => task.key}
        style={styles.scrollContent}
      />
    </View>
  );
};

export default TasksList;
