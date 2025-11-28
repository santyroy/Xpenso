import { Pressable, StyleSheet, Text } from 'react-native';
import { Category } from '../types/transactions-types';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useAppTheme } from '../hooks/useAppTheme';

type Props = {
  category: Category;
  state: Category | undefined;
  setState: (state: Category) => void;
};

export default function CategoryIcon({ category, state, setState }: Props) {
  const { colors } = useAppTheme();
  const categoryName =
    category.name[0].toUpperCase() + category.name.substring(1);

  const handleCategory = () => {
    setState(category);
  };

  return (
    <Pressable
      style={[
        styles.container,
        {
          borderColor:
            state?.id === category.id ? colors.primary : colors.border,
        },
      ]}
      onPress={handleCategory}
    >
      <FontAwesome6
        name={category.iconName}
        iconStyle="solid"
        size={24}
        color={colors.text}
      />
      <Text style={[{ color: colors.text }]}>{categoryName}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
