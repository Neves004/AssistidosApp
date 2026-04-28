import './gesture-hander';
import { StyleSheet } from 'react-native';

import Routes from '@/routes/index.routes';
import {NavigationContainer} from '@react-navigation/native'

export default function App() {
  return (
    <NavigationContainer>
      <Routes/> 
    </NavigationContainer>
  );
}
