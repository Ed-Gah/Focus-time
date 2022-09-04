import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet} from "react-native";
import { AsyncStorage } from 'react-native';
import { Focus } from "./src/features/focus/Focus";
import FocusHistory from "./src/features/focus/FocusHistory";
import { Timer } from "./src/features/timer/Timer";

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};
export default function App() {
  
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusSubjectWithStatus = (subject, status) => {
      setFocusHistory([...focusHistory, {key: String(focusHistory.length + 1), subject, status}]);
  }
  
  const onClear = () => {
    setFocusHistory([]);
  }

      // Resuming the state of your app during close and reopening.
    const saveFocusHistory = async () => {
      try {
        await  AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory))
      } catch(e) {
          console.log(e);
      }
    }

    const loadFocusHistory = async () => {
      try {
        const history = await AsyncStorage.getItem("focusHistory");
        if (history && JSON.parse(history).length) {
             setFocusHistory(JSON.parse(history));
        }
      } catch(e) {
        console.log(e);
      }
    }


    useEffect(() => {
      loadFocusHistory();
    }, [])

    useEffect(() => {
      saveFocusHistory();
    }, [focusHistory]);

  return(
    <View style={styles.container}>
      {focusSubject ? 
        <Timer 
            focusSubject={focusSubject} 
            onTimerEnd={() => {
                addFocusSubjectWithStatus(focusSubject, STATUSES.COMPLETE);
                setFocusSubject(null);
              }}
            clearSubject={() => {
              addFocusSubjectWithStatus(focusSubject, STATUSES.CANCELLED);
              setFocusSubject(null)
            }}
        />:
        <> 
        <Focus addSubject={setFocusSubject}/>
        <FocusHistory focusHistory={focusSubject} onClear={onClear} />
        </>
        }
      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#252250',
    },
});
