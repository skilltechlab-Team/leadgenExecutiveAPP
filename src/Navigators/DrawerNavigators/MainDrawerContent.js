import React from "react";
import { StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Box, VStack, Divider, Center } from "native-base";
import DrawerItems, { ProfileAvatar } from "../../../components/AdminDrwaerItems";
import { Auth } from 'aws-amplify';
import { createUserAuth } from '../../../store/reducers/userAuth';
import { useDispatch, useSelector } from "react-redux";
import { createUsersList } from "../../../store/reducers/usersList";

const AdminDrawerContent = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.auth[0]);
  const userAttr = currentUser[0].userAttr;
  let email = 'user@user.com';
  let username = 'User';
  userAttr.forEach(element => {
    if (element.Name === 'email') {
      email = element.Value.split("@")[0]
    }
  });
  if (currentUser[0] !== undefined)
    username = currentUser[0].token.payload.username;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async function signOut() {
    try {
      await Auth.signOut();
      props.navigation.replace("Login");
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  return (
    <Box style={{ flex: 1 }} safeArea>
      <DrawerContentScrollView {...props}>
        <Box style={styles.drawerContent} >
          <ProfileAvatar
            uri={'../../../assets/admin.png'}
            name={capitalizeFirstLetter(username)}
            username={"@" + email}
            colorCode={"#000"}
          />
          <Center m={1} p={1}>
            <Divider my={2} w={'100%'} />
          </Center>
          <VStack>
            <Box style={styles.drawerSection}>
              <DrawerItemList {...props} />
            </Box>
          </VStack>
        </Box>
      </DrawerContentScrollView>
      <VStack divider={<Divider />} space={4}>
        <Box>
          <DrawerItems
            label={"Sign Out"}
            icon={"exit-to-app"}
            onSelect={signOut}
          />
        </Box>
      </VStack>
    </Box>

  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  drawerSection: {
    marginTop: -10
  }
});

export default AdminDrawerContent;
