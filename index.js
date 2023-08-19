import { AppRegistry, LogBox } from 'react-native';

import App from './sources/App';

LogBox.ignoreLogs([
  'Overriding previous layout animation with new one before the first began',
]);

AppRegistry.registerComponent('todo_exam16', () => App);
