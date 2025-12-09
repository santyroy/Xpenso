import { Image, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';

type Props = {
  greetings: string;
  name: string;
};

export default function Header({ greetings, name }: Props) {
  const { colors } = useAppTheme();

  return (
    <View>
      <View style={styles.userDetailsContainer}>
        <Image
          source={{
            uri: 'https://www.headshotpro.com/avatar-results/danny-1.webp',
          }}
          style={[styles.image]}
        />
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
