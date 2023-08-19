import React, { useState } from 'react';
import {
  FlatListProps,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '.';
import { useGetPostsQuery } from '../redux/postApi';
import { Header, PostItem, Text } from '../components';

type PostListProps = NativeStackScreenProps<RootStackParamList, 'PostList'>;

type ListComponentProps<ItemT> = FlatListProps<ItemT>;

const ListComponent = <ItemT,>({
  data,
  renderItem,
  ...props
}: ListComponentProps<ItemT>) => {
  return <Animated.FlatList data={data} renderItem={renderItem} {...props} />;
};

export function PostListScreen({ navigation }: PostListProps) {
  const { data } = useGetPostsQuery();
  const [createMode, setCreateMode] = useState<boolean | number | void>(false);
  const [editableId, setEditableId] = useState<number | void>();

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <ListComponent
        data={data}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => (
          <PostItem
            data={item}
            editMode={item.id === editableId}
            //
            onPress={() => navigation.push('Post', item)}
            onChangeMode={setEditableId}
            onUpdate={setEditableId}
          />
        )}
        ListHeaderComponent={
          createMode ? (
            <PostItem
              editMode
              onChangeMode={setCreateMode}
              onUpdate={setCreateMode}
            />
          ) : null
        }
        ListEmptyComponent={<Text>No posts yet.</Text>}
        windowSize={11}
        initialNumToRender={10}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.contentContainer}
      />
      <Header onPressCreate={setCreateMode} />
      <View style={styles.background} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 150,
  },

  background: {
    position: 'absolute',
    width: '100%',
    height: 200,
    backgroundColor: '#7891FF',
    zIndex: -1,
  },
});
