import { Image, StyleSheet, Text, View } from 'react-native';
import Loading from './Loading';
import { useAppTheme } from '../hooks/useAppTheme';
import { useUser } from '../hooks/useUser';
import { greetMessage } from '../utils/text-utils';
import { Dirs } from 'react-native-file-access';
import { DEFAULT_AVATAR } from '../utils/file-utils';

export default function Header() {
  const { colors } = useAppTheme();
  const { isLoading, name, profilePicFilename } = useUser();
  const greetings = greetMessage();
  const userAvatar = profilePicFilename
    ? { uri: `file://${Dirs.DocumentDir}/${profilePicFilename}` }
    : DEFAULT_AVATAR;

  if (isLoading) return <Loading />;
  return (
    <View>
      <View style={styles.userDetailsContainer}>
        <Image source={userAvatar} style={[styles.image]} />
        <View>
          <Text style={[{ color: colors.text }]}>{greetings},</Text>
          <Text style={[{ color: colors.text }, styles.name]}>{name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userDetailsContainer: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  image: { height: 50, width: 50, borderRadius: 25 },
  name: { fontSize: 20, fontWeight: 500 },
});
