/**
 * @format
 */

import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'moment/locale/vi';  // config language time to Vietnam

import { Text, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
console.disableYellowBox = true;

if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
}

if (TouchableHighlight.defaultProps == null) {
    TouchableHighlight.defaultProps = {};
    TouchableHighlight.defaultProps.activeOpacity = 0.6;
    TouchableHighlight.defaultProps.underlayColor = '#F2F4F7';
    TouchableHighlight.defaultProps.delayLongPress = 200;
}

if (TouchableOpacity.defaultProps == null) {
    TouchableOpacity.defaultProps = {};
    TouchableOpacity.defaultProps.activeOpacity = 0.5;
    TouchableOpacity.defaultProps.delayLongPress = 200;
}

if (TextInput.defaultProps == null) {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
}

AppRegistry.registerComponent(appName, () => App);
