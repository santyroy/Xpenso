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
import Label from '../../components/Label';
import DropDown from '../../components/DropDown';
import { useUser } from '../../hooks/useUser';
import { useAppTheme } from '../../hooks/useAppTheme';
import { SignupFormError } from '../../types/errors-types';
import { countryName } from '../../utils/text-utils';

export default function ProfileScreen() {
  const { isLoading, name, updateName, country, updateCountry } = useUser();
  const [userName, setUserName] = useState('');
  const [userCountry, setUserCountry] = useState(country);
  const [errors, setErrors] = useState<SignupFormError>({});
  const { colors } = useAppTheme();

  // Keep the local input in sync with the Context data
  useFocusEffect(
    useCallback(() => {
      if (name) {
        setUserName(name);
      }
      if (country) {
        setUserCountry(country);
      }
      setErrors({});
    }, [name, country]),
  );

  const handleUpdateProfile = () => {
    setErrors({});
    const err: SignupFormError = {};
    if (userName.trim() === '') {
      err.name = 'Name is required';
    }
    if (userCountry.trim() === '') {
      err.name = 'Country is required';
    }

    setErrors(err);
    if (Object.values(err).length !== 0) return;

    updateName(userName);
    updateCountry(userCountry.trim());

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
      <Text style={[styles.userInfoText, { color: colors.text }]}>
        User Information
      </Text>
      <View style={[styles.userInfoCard, { backgroundColor: colors.card }]}>
        <View style={styles.formGroup}>
          <Label text="Name" />
          <Input state={userName} setState={setUserName} />
          {errors.name && <Error errorMsg={errors.name} />}
        </View>
        <View style={styles.formGroup}>
          <Label text="Country" />
          <View
            style={[styles.countryDropDown, { borderColor: colors.border }]}
          >
            <DropDown
              list={countryName}
              state={userCountry}
              setState={setUserCountry}
            />
          </View>
          {errors.country && <Error errorMsg={errors.country} />}
        </View>
        <Button text="Update Profile" onPress={handleUpdateProfile} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, gap: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileContainer: { alignItems: 'center' },
  profilePicture: { height: 100, aspectRatio: 1, borderRadius: 50 },
  userInfoCard: { borderRadius: 14, padding: 20, gap: 20 },
  userInfoText: { fontSize: 18, fontWeight: 600, textAlign: 'center' },
  formGroup: { gap: 5 },
  countryDropDown: { borderWidth: 2, borderRadius: 14, overflow: 'hidden' },
});
