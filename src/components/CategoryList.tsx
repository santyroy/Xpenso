import { FlatList, StyleSheet } from 'react-native';
import { Category } from '../types/transactions-types';
import CategoryIcon from './CategoryItem';

type Props = {
  data: Category[];
  state: Category | undefined;
  setState: (state: Category) => void;
};

export default function CategoryList({ data, ...props }: Props) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <CategoryIcon category={item} {...props} />}
      keyExtractor={item => item.id.toString()}
      numColumns={4}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
