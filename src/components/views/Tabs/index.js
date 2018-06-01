import { Navigation } from 'react-native-navigation';

import DummyIcon from '../../../assets/icons/icon.png';
import MenuIcon from '../../../assets/icons/menu.png';

const navStyle = {
  navBarTextFontSize: 20,
  navBarTextColor: '#ffffff',
  navBarFontFamily: 'RobotoCondensed-Bold',
  navBarBackgroundColor: '#009999'
};

const LoadTabs = (initialTab) => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'PubApp.Home',
        label: 'Home',
        title: 'Home',
        icon: DummyIcon,
        navigatorStyle: navStyle,
        navigatorButtons: {
          rightButtons: [
            {
              title: 'Menu',
              id: 'MenuButton',
              icon: MenuIcon
            }
          ]
        }
      },
      {
        screen: 'PubApp.Profile',
        label: 'Profile',
        title: 'Profile',
        icon: DummyIcon,
        navigatorStyle: navStyle,
        navigatorButtons: {
          rightButtons: [
            {
              title: 'Menu',
              id: 'MenuButton',
              icon: MenuIcon
            }
          ]
        }
      },
      {
        screen: 'PubApp.QRReader',
        label: 'QR-Reader',
        title: 'QR-Reader',
        icon: DummyIcon,
        navigatorStyle: navStyle
      }
    ],
    appStyle: {
      initialTabIndex: initialTab,
      tabBarButtonColor: '#ffffff',
      tabBarBackgroundColor: '#009999',
      tabBarSelectedButtonColor: '#33ffff'
    },
    drawer: {
      right: {
        screen: 'PubApp.SideDrawer',
        fixedWidth: 500
      }
    }
  });
};

export default LoadTabs;
