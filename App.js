import { Navigation } from 'react-native-navigation';

import Login from './src/components/views/Login';
import Registration from './src/components/views/Registration';
import Home from './src/components/views/Home';
import Profile from './src/components/views/Profile';
import QRReader from './src/components/views/QRReader';

import SideDrawer from './src/components/views/Tabs/SideDrawer';

Navigation.registerComponent('PubApp.Login', () => Login);
Navigation.registerComponent('PubApp.Registration', () => Registration);
Navigation.registerComponent('PubApp.Home', () => Home);
Navigation.registerComponent('PubApp.Profile', () => Profile);
Navigation.registerComponent('PubApp.QRReader', () => QRReader);
Navigation.registerComponent('PubApp.SideDrawer', () => SideDrawer);

export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: 'PubApp.Login',
    title: 'Login',
    navigatorStyle: {
      navBarHidden: true
    }
  }
});
