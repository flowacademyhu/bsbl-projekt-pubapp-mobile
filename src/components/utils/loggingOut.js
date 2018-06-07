import axios from 'axios';
import { HttpMiddlewareService } from 'axios-middleware';
import { Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';

const service = new HttpMiddlewareService(axios);

const openLoginPage = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'PubApp.Login',
      title: 'Login',
      navigatorStyle: {
        navBarHidden: true
      }
    }
  });
};

service.register({
  onResponse (response) {
    console.log(response);
    return response;
  },
  onResponseError (error) {
    console.log(error.response.data);
    if (error.response.data === 'Session validations.') {
      Alert.alert(
        'Session expired',
        'Session expired. Please log in again.',
        [
          {text: 'OK', onPress: () => openLoginPage()}
        ]
      );
    }
    return error;
  }
});
export default axios;
