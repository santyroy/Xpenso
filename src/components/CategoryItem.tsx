import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';
import { Category } from '../types/transactions-types';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useAppTheme } from '../hooks/useAppTheme';

type Props = {
  category: Category;
  state: Category | undefined;
  setState: (state: Category) => void;
};

const screenWidth = Dimensions.get('window').width;
const GAP = 24;
const NUM_COLUMNS = 4;
const ITEM_WIDTH = (screenWidth - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;

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
    width: ITEM_WIDTH,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
