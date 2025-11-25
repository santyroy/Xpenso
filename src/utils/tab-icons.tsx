import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { IconProps } from '../types/icons-types';

export function HomeIcon({ color, size }: IconProps) {
  return (
    <FontAwesome6 name="house" color={color} size={size} iconStyle="solid" />
  );
}
export function AnalyticsIcon({ color, size }: IconProps) {
  return (
    <FontAwesome6
      name="chart-column"
      color={color}
      size={size}
      iconStyle="solid"
    />
  );
}
export function BudgetIcon({ color, size }: IconProps) {
  return (
    <FontAwesome6
      name="bag-shopping"
      color={color}
      size={size}
      iconStyle="solid"
    />
  );
}
export function ProfileIcon({ color, size }: IconProps) {
  return (
    <FontAwesome6 name="user" color={color} size={size} iconStyle="solid" />
  );
}
