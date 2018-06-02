import { Navigation } from 'react-native-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

const navStyle = {
  navBarTextFontSize: 20,
  navBarTextColor: '#ffffff',
  navBarFontFamily: 'RobotoCondensed-Bold',
  navBarBackgroundColor: '#009999'
};

const LoadTabs = (initialTab) => {
  Promise.all([
    Icon.getImageSource('star', 30, 'white'),
    Icon.getImageSource('account-circle', 30, 'white'),
    Icon.getImageSource('camera', 30, 'white'),
    Icon.getImageSource('power-settings-new', 35, 'white')
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'PubApp.Home',
          label: 'Home',
          title: 'Home',
          icon: sources[0],
          navigatorStyle: navStyle,
          navigatorButtons: {
            rightButtons: [
              {
                title: 'Log out',
                id: 'LogoutButton',
                icon: sources[3]
              }
            ]
          }
        },
        {
          screen: 'PubApp.Profile',
          label: 'Profile',
          title: 'Profile',
          icon: sources[1],
          navigatorStyle: navStyle,
          navigatorButtons: {
            rightButtons: [
              {
                title: 'Log out',
                id: 'LogoutButton',
                icon: sources[3]
              }
            ]
          }
        },
        {
          screen: 'PubApp.QRReader',
          label: 'QR Reader',
          title: 'QR Reader',
          icon: sources[2],
          navigatorStyle: navStyle,
          navigatorButtons: {
            rightButtons: [
              {
                title: 'Log out',
                id: 'LogoutButton',
                icon: sources[3]
              }
            ]
          }
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
  });
};

export default LoadTabs;
