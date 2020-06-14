/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const FirebaseContext = React.createContext();

const FirebaseProvider = props => {
  const [user, setUser] = useState({
    name: '...',
  });
  const [tasks, setTasks] = useState([]);

  const listenToUser = () => {
    database()
      .ref(`users/${auth().currentUser.uid}`)
      .on('value', snapshot => {
        setUser(snapshot.val());
      });
  };

  const listenToTasks = () => {
    database()
      .ref(`tasks/${auth().currentUser.uid}`)
      .on('value', async snapshot => {
        var tasks = [];
        await snapshot.forEach(taskSnapshot => {
          let taskAux = taskSnapshot.val();
          taskAux.key = taskSnapshot.key;
          tasks.push(taskAux);
        });
        setTasks(tasks);
      });
  };

  const toggleTaskDone = taskKey => {
    let taskRef = database().ref(`tasks/${auth().currentUser.uid}/${taskKey}`);

    taskRef.once('value').then(snapshot => {
      console.log('snapshot', snapshot.val().done);
      taskRef.update({
        done: !snapshot.val().done,
      });
    });
  };

  const deleteTask = taskKey => {
    database()
      .ref(`tasks/${auth().currentUser.uid}/${taskKey}`)
      .remove();
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        setUser,
        listenToUser,
        listenToTasks,
        tasks,
        toggleTaskDone,
        deleteTask,
      }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export {FirebaseContext, FirebaseProvider};
