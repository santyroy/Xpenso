import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Input from './Input';
import Label from './Label';
import DropDown from './DropDown';
import Button from './Button';
import Error from './Error';
import { useUser } from '../hooks/useUser';
import { useAppTheme } from '../hooks/useAppTheme';
import { SignupFormError } from '../types/errors-types';
import { countryName } from '../utils/text-utils';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [errors, setErrors] = useState<SignupFormError>({});
  const { completeOnboarding } = useUser();
  const { colors } = useAppTheme();

  const handleSignup = () => {
    setErrors({});
    if (name.trim() === '') {
      setErrors(prev => ({ ...prev, name: 'Name is requied' }));
    }
    if (country.trim() === '') {
      setErrors(prev => ({ ...prev, country: 'Country is requied' }));
    }
    if (Object.values(errors).length) return;

    completeOnboarding(name.trim(), country.trim());
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Label text="Name*" />
        <Input
          placeholder="Enter name"
          state={name}
          setState={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />
        {errors.name && <Error errorMsg={errors.name} />}
      </View>
      <View style={styles.formGroup}>
        <Label text="Country*" />
        <View style={[styles.countryDropDown, { borderColor: colors.border }]}>
          <DropDown list={countryName} state={country} setState={setCountry} />
        </View>
        {errors.country && <Error errorMsg={errors.country} />}
      </View>
      <Button text="Create account" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 30 },
  formGroup: { gap: 10 },
  countryDropDown: { borderWidth: 2, borderRadius: 14, overflow: 'hidden' },
});
