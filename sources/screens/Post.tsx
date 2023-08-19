import React, { useRef } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput as RNTextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '.';
import { CommentItem, Icon, Text, TextInput } from '../components';
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from '../redux/postApi';
import { Comment, Post } from '../redux/types';

type PostProps = NativeStackScreenProps<RootStackParamList, 'Post'>;

export function PostScreen({
  route: { params: postData },
  navigation,
}: PostProps) {
  const { id } = postData;

  const { data } = useGetCommentsQuery(id);
  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <FlatList
        data={data}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => <CommentItem data={item} />}
        ListHeaderComponent={
          <ListHeaderComponent
            data={postData}
            onPressBack={navigation.goBack}
          />
        }
        ListHeaderComponentStyle={styles.headerContainer}
        ListEmptyComponent={<Text>No comments yet.</Text>}
        stickyHeaderIndices={[0]}
        keyboardShouldPersistTaps="never"
        contentContainerStyle={styles.contentContainer}
      />
      <Footer
        isActive={isCreating}
        //
        onPost={text =>
          createComment({
            text,
            postId: id,
          }).unwrap()
        }
      />
    </KeyboardAvoidingView>
  );
}

interface ListHeaderComponentProps {
  data: Post;
  onPressBack?: () => void;
}

const ListHeaderComponent = ({
  data,
  onPressBack,
}: ListHeaderComponentProps) => {
  const { title, body } = data;

  return (
    <>
      <View style={styles.titleContainer}>
        <Icon style={styles.backIcon} onPress={onPressBack} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text numberOfLines={3} style={styles.body}>
        {body}
      </Text>
    </>
  );
};

interface FooterProps {
  isActive?: boolean;
  onPost?: (text: string) => Promise<Comment>;
}

const Footer = ({ isActive, onPost }: FooterProps) => {
  const inputRef = useRef<RNTextInput>(null);
  const textRef = useRef('');

  function onPressPost() {
    const value = textRef.current.trim();
    if (!value) return;

    onPost?.(value)
      .then(() => {
        inputRef.current?.clear();
      })
      .catch(() => null);
  }

  return (
    <View
      style={[styles.footerContainer, isActive && styles.activeFooterContainer]}
    >
      <TextInput
        ref={inputRef}
        multiline
        maxLength={300}
        placeholder="Comment..."
        placeholderTextColor="gray"
        style={styles.input}
        //
        onChangeText={text => {
          textRef.current = text;
        }}
      />
      <Icon
        disabled={isActive}
        color="green"
        style={styles.postIcon}
        onPress={onPressPost}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },

  headerContainer: {
    padding: 20,
    paddingTop: 60,
    margin: -20,
    marginBottom: 20,
    borderBottomWidth: 5,
    backgroundColor: '#4E67D4',
  },

  footerContainer: {
    height: '16%',
    minHeight: 120,
    borderTopWidth: 4,
    borderColor: '#0002',
    backgroundColor: 'white',
  },

  activeFooterContainer: {
    opacity: 0.5,
  },

  input: {
    flex: 1,
    padding: 10,
    paddingBottom: 20,
    paddingRight: 40,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  backIcon: {
    marginStart: -10,
    marginEnd: 10,
  },

  postIcon: {
    position: 'absolute',
    right: 0,
    margin: 10,
  },

  title: {
    flexShrink: 1,
    fontSize: 18,
    color: 'white',
  },

  body: {
    color: 'white',
    opacity: 0.8,
  },
});
