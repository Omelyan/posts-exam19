import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Comment } from '../redux/types';
import { Icon } from './Icon';
import { TextInput } from './TextInput';
import {
  useRemoveCommentMutation,
  useUpdateCommentMutation,
} from '../redux/postApi';

interface CommentItemProps {
  data: Comment;
}

export const CommentItem = ({ data }: CommentItemProps) => {
  const { text } = data;

  const textRef = useRef(text);
  const [linesLimit, setLinesLimit] = useState<number | undefined>(2);
  const [editMode, setEditMode] = useState(false);
  const [updateComment, { isLoading: isUpdating }] = useUpdateCommentMutation();
  const [removeComment, { isLoading: isRemoving }] = useRemoveCommentMutation();

  const isActive = isUpdating || isRemoving;

  function onSubmit() {
    const value = textRef.current.trim();
    if (!value) return;
    updateComment({ ...data, text: value })
      .unwrap()
      .then(() => setEditMode(false))
      .catch(() => null);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isActive}
      style={[styles.container, isActive && styles.activeContainer]}
      //
      onPress={() => {
        setLinesLimit(linesLimit ? undefined : 2);
      }}
    >
      <View style={styles.headerContainer}>
        <Icon color="#0001" />
        <View style={styles.name} />
        {editMode ? (
          <>
            <Icon color="green" long onPress={onSubmit} />
            <Icon color="silver" onPress={() => setEditMode(false)} />
          </>
        ) : (
          <>
            <Icon color="darkgray" onPress={() => setEditMode(true)} />
            <Icon color="tomato" onPress={() => removeComment(data)} />
          </>
        )}
      </View>

      {editMode ? (
        <TextInput
          autoFocus
          multiline
          defaultValue={text}
          style={styles.input}
          //
          onChangeText={value => {
            textRef.current = value;
          }}
        />
      ) : (
        <Text numberOfLines={linesLimit}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#0002',
    paddingBottom: 15,
  },

  activeContainer: {
    opacity: 0.5,
  },

  headerContainer: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
    marginBottom: 10,
  },

  name: {
    width: 70,
    height: 15,
    borderRadius: 4,
    marginEnd: 'auto',
    backgroundColor: '#0001',
  },

  input: {
    height: 70,
    color: '#2E57D0',
  },
});
