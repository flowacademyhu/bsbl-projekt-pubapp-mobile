import { Navigation } from 'react-native-navigation';

const RegistrationScreen = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'UdemyApp.Registration',
      title: 'Registration',
      navigatorStyle: {
        navBarHidden: true
      }
    }
  });
};

export default RegistrationScreen;
