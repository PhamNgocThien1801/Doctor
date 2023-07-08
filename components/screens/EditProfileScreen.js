import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = () => {
    // Check if the new password and confirm password match
    if (newPassword !== confirmNewPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    // Reauthenticate the user with their current password
    const user = auth.currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        // Update the user's password with the new password
        user
          .updatePassword(newPassword)
          .then(() => {
            alert("Password updated successfully");
            // Clear the input fields
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleGoToHome = () => {
    navigation.navigate("Home"); // Navigate to the "Home" screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Current Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      <Text>New Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <Text>Confirm New Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
      />

      <Button title="Change Password" onPress={handleChangePassword} />

      {/* Button to go to Home screen */}
      <Button title="Go to Home" onPress={handleGoToHome} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

export default EditProfileScreen;
