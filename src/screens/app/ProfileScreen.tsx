import { useCallback, useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import { Dirs } from 'react-native-file-access';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
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
import { DEFAULT_AVATAR } from '../../utils/file-utils';

export default function ProfileScreen() {
  const {
    isLoading,
    name,
    updateName,
    country,
    updateCountry,
    profilePicFilename,
    updateProfilePic,
  } = useUser();
  const [userName, setUserName] = useState('');
  const [userCountry, setUserCountry] = useState(country);
  const [errors, setErrors] = useState<SignupFormError>({});
  const { colors } = useAppTheme();
  const userAvatar = profilePicFilename
    ? { uri: `file://${Dirs.DocumentDir}/${profilePicFilename}` }
    : DEFAULT_AVATAR;

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
      err.country = 'Country is required';
    }

    setErrors(err);
    if (Object.values(err).length !== 0) return;

    updateName(userName);
    updateCountry(userCountry.trim());

    if (Platform.OS === 'android') {
      ToastAndroid.show('Profile Update successful', ToastAndroid.SHORT);
    }
  };

  const handleImagePicker = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.didCancel) return;

    if (result.assets?.length) {
      const tempUri = result.assets[0].uri;
      if (tempUri) {
        updateProfilePic(tempUri);
      }
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
      <View style={[styles.profileContainer, { borderColor: colors.border }]}>
        <Image source={userAvatar} style={styles.profilePicture} />
        <Pressable
          onPress={handleImagePicker}
          style={[styles.imagePicker, { backgroundColor: colors.text }]}
        >
          <FontAwesome6
            name="image"
            iconStyle="solid"
            size={18}
            color={colors.background}
          />
        </Pressable>
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
  container: { flex: 1, paddingHorizontal: 15, paddingTop: 10, gap: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileContainer: { alignItems: 'center', marginHorizontal: 'auto' },
  profilePicture: { height: 100, aspectRatio: 1, borderRadius: 50 },
  imagePicker: {
    position: 'absolute',
    bottom: 4,
    right: 0,
    padding: 6,
    borderRadius: 15,
  },
  userInfoCard: { borderRadius: 14, padding: 20, gap: 20 },
  userInfoText: { fontSize: 18, fontWeight: 600, textAlign: 'center' },
  formGroup: { gap: 5 },
  countryDropDown: { borderWidth: 2, borderRadius: 14, overflow: 'hidden' },
});
