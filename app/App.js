import React, {useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Auth0 from 'react-native-auth0';
import {
  R_SERVER_URL,
  X_R_SERVER_URL,
  PROCESS_ETA_EP,
  RAND_INT,
  API_AUDIENCE,
  CLIENT_ID,
  DOMAIN,
} from '@env';

var credentials = {
  client_id: CLIENT_ID,
  domain: DOMAIN,
};
const auth0 = new Auth0(credentials);

const randInt = Number(RAND_INT);
console.log("Random integer ('R'): " + randInt);

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [inputValues, setInputValues] = useState(Array(10).fill('0'));

  const handleInputChange = (index, text) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);
  };

  const handleSubmit = async () => {
    const modifiedInputValues = inputValues.map(value =>
      value === '' ? '0' : value,
    );

    if (modifiedInputValues.some(value => Number(value.trim()) < 0)) {
      Alert.alert('Error', 'Please enter a positive value in input boxes');
    } else {
      try {
        console.log(
          'Invoking ' +
            R_SERVER_URL +
            PROCESS_ETA_EP +
            ' ... body: ' +
            JSON.stringify({client_id: 'r_client', data: [randInt]}),
        );
        const response_1 = await fetch(R_SERVER_URL + PROCESS_ETA_EP, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({client_id: 'r_client', data: [randInt]}),
        });

        const xMinusRValues = modifiedInputValues.map(
          value => Number(value) - randInt,
        );

        console.log(
          'Invoking ' +
            X_R_SERVER_URL +
            PROCESS_ETA_EP +
            ' ... body: ' +
            JSON.stringify({client_id: 'x_r_client', data: xMinusRValues}),
        );
        const response_2 = await fetch(X_R_SERVER_URL + PROCESS_ETA_EP, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({client_id: 'x_r_client', data: xMinusRValues}),
        });

        if (response_1.ok && response_2.ok) {
          Alert.alert('Success', `You entered [${inputValues}]`);
          setInputValues(Array(10).fill('0'));
        } else {
          Alert.alert('Error', 'Something went wrong');
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Network error');
      }
    }
  };

  const onLogin = () => {
    auth0.webAuth
      .authorize({
        scope: 'user able to post sum',
        audience: API_AUDIENCE,
      })
      .then(credentials => {
        setAccessToken(credentials.accessToken);
      })
      .catch(error => console.log(error));
  };

  const onLogout = () => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        Alert.alert('Logged out!');
        setAccessToken(null);
      })
      .catch(error => {
        console.log('Log out cancelled');
      });
  };

  let loggedIn = accessToken !== null;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ETA Prediction Client</Text>
      <Text>You are{loggedIn ? ' ' : ' not '}logged in. </Text>
      {loggedIn ? (
        <>
          <View style={styles.formContainer}>
            <Text style={styles.head}>Enter your secret values:</Text>
            {inputValues.map((value, index) => (
              <TextInput
                key={index}
                style={styles.input}
                onChangeText={text => handleInputChange(index, text)}
                value={value}
                keyboardType="numeric"
                placeholder={`Value ${index + 1}`}
              />
            ))}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <Button onPress={onLogout} title="Log Out" />
        </>
      ) : (
        <Button onPress={onLogin} title="Log In" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  head: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
