import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text } from "native-base";
import AdminDrawerContent from "./MainDrawerContent";
import LeadGenaration from "../../screens/LeadGenaration";
import ViewLead from "../../screens/ViewLead";
import About from '../../screens/About'
const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {

    return (
        <Drawer.Navigator drawerContent={(props) => <AdminDrawerContent {...props} />}
            screenOptions={{
                headerTitleStyle: {
                    color: "#fff"
                },
                headerStyle: {
                    backgroundColor: "#3e3d70"
                },
                headerTintColor: '#fff',
                drawerActiveBackgroundColor: "#cdcce1",
                headerBackgroundContainerStyle: {
                    borderBottomColor: "#94a3b8",
                    borderBottomWidth: 0.5
                },

            }}
        >
            <Drawer.Screen name="LeadGenaration" component={LeadGenaration} options={{
                title: "Add New Lead",
                drawerIcon: ({ focused, size }) => (
                    <Icon name="group-add" size={size} color={focused ? "#3e3d70" : "#3e3d70"} />
                ),
                drawerLabel: ({ focused }) => (
                    <Text color={focused ? "#3e3d70" : "#3e3d70"}  >
                        Add New Lead
                    </Text>
                ),
            }} />
            <Drawer.Screen name="ViewLead" component={ViewLead} options={{
                title: "Lead Details",
                drawerIcon: ({ focused, size }) => (
                    <Icon name="list" size={size} color={focused ? "#3e3d70" : "#3e3d70"} />
                ),
                drawerLabel: ({ focused }) => (
                    <Text color={focused ? "#3e3d70" : "#3e3d70"}  >
                        Lead Details
                    </Text>
                ),
            }} />

            <Drawer.Screen name="About" component={About} options={{
                title: "About",
                drawerIcon: ({ focused, size }) => (
                    <Icon name="info" size={size} color={focused ? "#3e3d70" : "#3e3d70"} />
                ),
                drawerLabel: ({ focused }) => (
                    <Text color={focused ? "#3e3d70" : "#3e3d70"}  >
                        About
                    </Text>
                ),
            }} />
        </Drawer.Navigator >
    );
}