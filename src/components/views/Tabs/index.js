import { Navigation } from 'react-native-navigation';

import DummyIcon from '../../../assets/icons/icon.png';

const navStyle = {
  navBarTextFontSize: 20,
  navBarTextColor: '#ffffff',
  navBarFontFamily: 'RobotoCondensed-Bold',
  navBarBackgroundColor: '#009999'
};

const LoadTabs = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'UdemyApp.Home',
        label: 'Home',
        title: 'Home',
        icon: DummyIcon,
        navigatorStyle: navStyle
      },
      {
        screen: 'UdemyApp.Profile',
        label: 'Profile',
        title: 'Profile',
        icon: DummyIcon,
        navigatorStyle: navStyle
      },
      {
        screen: 'UdemyApp.QRReader',
        label: 'QR-Reader',
        title: 'QR-Reader',
        icon: DummyIcon,
        navigatorStyle: navStyle
      }
    ]
  });
};

export default LoadTabs;
