import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "./contexts/AuthContext";
import { MoviesProvider } from "./contexts/MoviesContext";
import { MovieProvider } from "./contexts/MovieContext";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import MovieInfoScreen from "./screens/MovieInfoScreen";
import ShowTimesScreen from "./screens/ShowTimesScreen";
import SeatSelectionScreen from "./screens/SeatSelectionScreen";
import ProductScreen from "./screens/ProductScreen";
import TicketConfirmationScreen from "./screens/TicketConfirmationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import InvoiceScreen from "./screens/InvoiceScreen";
import AccountInfoScreen from "./screens/AccountInfoScreen";
import { DefaultTheme } from "@react-navigation/native";
import ReviewScreen from "./screens/ReviewScreen";
import PaymentMethodsScreen from "./screens/PaymentMethodsScreen";
import { ScreeningProvider } from "./contexts/ScreeningContext"
import { SeatProductProvider } from "./contexts/SeatProductContext"
import { OrderProvider } from "./contexts/OrderContext"

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <MoviesProvider>
        <MovieProvider>
          <ScreeningProvider>
            <SeatProductProvider>
              <OrderProvider>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName="Login"
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="SignUp" component={SignUpScreen} />
                  <Stack.Screen name="MovieInfo" component={MovieInfoScreen} />
                  <Stack.Screen name="Review" component={ReviewScreen} />
                  <Stack.Screen name="ShowTimes" component={ShowTimesScreen} />
                  <Stack.Screen
                    name="SeatSelection"
                    component={SeatSelectionScreen}
                  />
                  <Stack.Screen name="Product" component={ProductScreen} />
                  <Stack.Screen
                    name="TicketConfirmation"
                    component={TicketConfirmationScreen}
                  />
                  <Stack.Screen name="Profile" component={ProfileScreen} />
                  <Stack.Screen name="Invoice" component={InvoiceScreen} />
                  <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
                  <Stack.Screen
                    name="PaymentMethod"
                    component={PaymentMethodsScreen}
                  />
                </Stack.Navigator>
              </NavigationContainer>
              </OrderProvider>
            </SeatProductProvider>
          </ScreeningProvider>
        </MovieProvider>
      </MoviesProvider>
    </AuthProvider>
  );
}
