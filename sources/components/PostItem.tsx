import React, { useRef } from 'react';
import Animated, { Layout } from 'react-native-reanimated';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text } from './Text';
import { TextInput } from './TextInput';
import { Icon } from './Icon';
import {
  useCreatePostMutation,
  useRemovePostMutation,
  useUpdatePostMutation,
} from '../redux/postApi';
import { Post } from '../redux/types';

interface PostItemProps {
  data?: Post;
  editMode?: boolean;
  onPress?: (data?: Post) => void;
  onChangeMode?: (id?: number) => void;
  onUpdate?: (id?: number) => void;
}

export const PostItem = ({
  data,
  editMode,
  onPress,
  onChangeMode,
  onUpdate,
}: PostItemProps) => {
  const [removePost, { isLoading: isRemoving }] = useRemovePostMutation();
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const { id, title = '', body = '' } = data || {};
  const isActive = isCreating || isUpdating || isRemoving;

  // sure we should use react-hook-form or formik etc...
  const titleRef = useRef(title);
  const bodyRef = useRef(body);

  function onPressPost() {
    if (!titleRef.current.trim()) return;
    if (id) {
      updatePost({
        id,
        title: titleRef.current.trim(),
        body: bodyRef.current.trim(),
      })
        .unwrap()
        .then(() => onUpdate?.())
        .catch(() => null);
    } else {
      createPost({
        title: titleRef.current.trim(),
        body: bodyRef.current.trim(),
      })
        .unwrap()
        .then(() => onUpdate?.())
        .catch(() => null);
    }
  }

  return (
    <Animated.View
      style={[styles.container, isActive && styles.activeContainer]}
      pointerEvents={isActive ? 'none' : 'auto'}
    >
      {/* Content */}
      <View
        style={[
          styles.contentContainer,
          editMode && styles.activeContentContainer,
        ]}
      >
        {editMode ? (
          <View style={styles.topContainer}>
            <TextInput
              autoFocus
              multiline
              maxLength={100}
              inputMode="text"
              placeholder="Title"
              defaultValue={title}
              style={[styles.title, styles.input]}
              //
              onChangeText={text => {
                titleRef.current = text;
              }}
            />
            <View style={[styles.separator, styles.activeSeparator]} />
            <TextInput
              multiline
              maxLength={1000}
              inputMode="text"
              placeholder="Your post..."
              placeholderTextColor="tomato"
              defaultValue={body}
              //
              onChangeText={text => {
                bodyRef.current = text;
              }}
            />
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={hitSlop}
            style={styles.topContainer}
            //
            onPress={() => onPress?.(data)}
          >
            <Text numberOfLines={2} style={styles.title}>
              {title}
            </Text>
            {!!body && (
              <>
                <View style={styles.separator} />
                <Text numberOfLines={3}>{body}</Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Bottom */}
      <View style={styles.bottomContainer}>
        {data && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.detailContainer}
            //
            onPress={() => onPress?.(data)}
          >
            <Text style={styles.optionText}>Comments</Text>
          </TouchableOpacity>
        )}
        <Animated.View layout={Layout} style={styles.optionContainer}>
          {editMode ? (
            <>
              <Icon color="green" long onPress={onPressPost} />
              <Icon color="silver" onPress={() => onChangeMode?.()} />
            </>
          ) : (
            <>
              <Icon color="darkgray" onPress={() => onChangeMode?.(id)} />
              {!!id && <Icon color="tomato" onPress={() => removePost(id)} />}
            </>
          )}
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  activeContainer: {
    opacity: 0.8,
  },

  contentContainer: {
    marginBottom: 8,
    borderBottomWidth: 8,
    borderRadius: 6,
    borderColor: '#000d',
    backgroundColor: 'white',
  },

  activeContentContainer: {
    backgroundColor: 'cornsilk',
    borderColor: 'darkblue',
  },

  topContainer: {
    padding: 15,
  },

  bottomContainer: {
    flexDirection: 'row',
  },

  detailContainer: {},

  optionContainer: {
    flexDirection: 'row',
    gap: 5,
    padding: 5,
    marginLeft: 'auto',
    borderRadius: 50,
    backgroundColor: 'white',
  },

  optionText: {
    fontSize: 13,
    color: 'white',
    opacity: 0.7,
  },

  title: {
    color: '#243787',
    fontWeight: '500',
    fontSize: 20,
  },

  input: {
    paddingVertical: 5,
  },

  separator: {
    borderBottomWidth: 1,
    borderColor: '#0002',
    marginTop: 12,
    marginBottom: 8,
  },

  activeSeparator: {
    borderColor: '#4E67D4',
  },
});

const hitSlop = { top: 5, bottom: 10, left: 5, right: 5 };
