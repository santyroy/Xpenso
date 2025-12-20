import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignupForm from '../../components/SignupForm';
import SignupHeader from '../../components/SignupHeader';

export default function SignupScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SignupHeader pageTitle="Signup!" />
      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SignupForm />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: { flex: 1, justifyContent: 'center' },
});
