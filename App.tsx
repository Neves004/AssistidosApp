import './gesture-hander';
import { StyleSheet } from 'react-native';

import Routes from '@/routes/index.routes';
import { NavigationContainer } from '@react-navigation/native'
import { CardsProvider } from '@/context/cards.context';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/auth.context';

export default function App() {
  return (
    <AuthProvider>
    <ThemeProvider>
      <NavigationContainer>
        <CardsProvider>
          <Routes />
        </CardsProvider>
      </NavigationContainer>
    </ThemeProvider>
    </AuthProvider>
  );
}
