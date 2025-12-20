import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Input from './Input';
import Label from './Label';
import Button from './Button';
import Error from './Error';
import { useUser } from '../hooks/useUser';
import { SignupFormError } from '../types/errors-types';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<SignupFormError>({});
  const { completeOnboarding } = useUser();

  const handleSignup = () => {
    setErrors({});
    if (name.trim() === '') {
      setErrors({ name: 'Name is requied' });
      return;
    }
    completeOnboarding(name.trim());
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
      <Button text="Create account" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 30 },
  formGroup: { gap: 10 },
});
