import { Navigation } from 'react-native-navigation';

import Login from './src/components/views/Login';
import Home from './src/components/views/Home';
import Profile from './src/components/views/Profile';
import QRReader from './src/components/views/QRReader';

Navigation.registerComponent('UdemyApp.Login', () => Login);
Navigation.registerComponent('UdemyApp.Home', () => Home);
Navigation.registerComponent('UdemyApp.Profile', () => Profile);
Navigation.registerComponent('UdemyApp.QRReader', () => QRReader);

export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: 'UdemyApp.Login',
    title: 'Login',
    navigatorStyle: {
      navBarHidden: true
    }
  }
});
