import * as React from "react"
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type CustomCardProps = {
  title?: string;
  description?: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  children?: React.ReactNode;
};

const Card: React.FC<CustomCardProps> = ({
  title,
  description,
  style,
  titleStyle,
  descriptionStyle,
  children,
}) => {
  return (
    <View style={[styles.card, style]}>
      {/* <Text style={[styles.title, titleStyle]}>{title}</Text>
      {description && <Text style={[styles.description, descriptionStyle]}>{description}</Text>} */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0034BB',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#444',
  },
});

export default Card;
