import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../AuthScrren/Login';
import DrawerRoutes from './DrawerNavigators/MainDrawer';
import LeadGenaration from '../screens/LeadGenaration';
import NotFound from '../screens/NotFound';
// import DrawerRoutes from './DrawerNavigators/MainDrawer';
// import EditExecutive from '../Screens/EditExecutive';
const MainNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="Login" component={Login} />
                {/* <Stack.Screen name="LeadGenaration" component={LeadGenaration} /> */}
                <Stack.Screen name="DrawerRoutes" component={DrawerRoutes} />
                <Stack.Screen name="NotFound" component={NotFound} />
                {/* <Stack.Screen name="DrawerRoutes" component={DrawerRoutes} />
                <Stack.Screen name="EditExecutive" component={EditExecutive} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default MainNavigator;