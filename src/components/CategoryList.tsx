import { StyleSheet, View } from 'react-native';
import { Category } from '../types/transactions-types';
import CategoryIcon from './CategoryItem';

type Props = {
  data: Category[];
  state: Category | undefined;
  setState: (state: Category) => void;
};

export default function CategoryList({ data, ...props }: Props) {
  if (data.length === 0) return;

  return (
    <View style={styles.container}>
      {data.map(category => (
        <CategoryIcon key={category.id} category={category} {...props} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
