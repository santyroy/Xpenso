import { useCallback, useState } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { useUser } from '../../hooks/useUser';
import { useAppTheme } from '../../hooks/useAppTheme';
import { SignupFormError } from '../../types/errors-types';

export default function ProfileScreen() {
  const { isLoading, name, updateName } = useUser();
  const [userName, setUserName] = useState('');
  const [errors, setErrors] = useState<SignupFormError>({});
  const { colors } = useAppTheme();

  // Keep the local input in sync with the Context data
  useFocusEffect(
    useCallback(() => {
      if (name) {
        setUserName(name);
      }
      setErrors({});
    }, [name]),
  );

  const handleUpdateProfile = () => {
    setErrors({});
    const err: SignupFormError = {};
    if (userName.trim() === '') {
      err.name = 'Name is required';
    }

    setErrors(err);
    if (Object.values(err).length !== 0) return;

    updateName(userName);

    if (Platform.OS === 'android') {
      ToastAndroid.show('Profile Update successful', ToastAndroid.SHORT);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: 'https://www.headshotpro.com/avatar-results/danny-1.webp',
          }}
          style={styles.profilePicture}
        />
      </View>
      <View style={[styles.userInfoCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.userInfoText, { color: colors.text }]}>
          User Information
        </Text>
        <Input state={userName} setState={setUserName} />
        {errors.name && <Error errorMsg={errors.name} />}
      </View>
      <Button text="Update Profile" onPress={handleUpdateProfile} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, gap: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileContainer: { alignItems: 'center' },
  profilePicture: { height: 100, aspectRatio: 1, borderRadius: 50 },
  userInfoCard: { borderRadius: 14, padding: 20, gap: 10 },
  userInfoText: { fontSize: 18, fontWeight: 600 },
});
