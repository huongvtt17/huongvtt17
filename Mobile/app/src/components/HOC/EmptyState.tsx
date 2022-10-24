import { font, font_size } from '@/configs/fonts';
import React, { memo } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const EmptyState = memo(function EmptyNote({
  content, customStyle
}: {
  content: string,
  customStyle?: object
}) {
  return (
    <View style={[styles.container, customStyle]}>
      <Text style={styles.txtContent}>{content}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 100
  },
  txtContent: {
    color: 'gray',
    textAlign: 'center',
    fontSize: font_size.NORMAL,
    fontFamily: font.SFProTextRegular
  }
})

export default EmptyState;
