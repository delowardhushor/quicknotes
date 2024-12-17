import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { addNote, updateNote } from '../redux/notesSlice';

const generateRandomId = () => Math.random().toString(36).substr(2, 9);

export default function AddEditNoteScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const note = route.params?.note;

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  // Set header title based on whether editing or creating
  useEffect(() => {
    navigation.setOptions({
      title: note ? 'Update Note' : 'Create Note',
    });
  }, [navigation, note]);

  const handleSave = () => {
    const currentTime = new Date().toISOString();
    const newNote = {
      id: note?.id || generateRandomId(),
      title: title || content.split(' ').slice(0, 5).join(' '),
      content,
      created: note?.created || currentTime,
      updated: currentTime,
    };

    if (note) dispatch(updateNote(newNote));
    else dispatch(addNote(newNote));

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      /> */}
      <TextInput
        style={styles.input}
        placeholder="Type yout note..."
        value={content}
        onChangeText={setContent}
        textAlignVertical="top"
        multiline
      />
      <TouchableOpacity
        style={{
            height:40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#6200ee',
            borderRadius: 10,
        }}
        onPress={handleSave}
      >
        <Text style={{color:"#fff", fontWeight:'600',  }} >SAVE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'white' },
  input: { borderWidth: 1, flex:1, borderRadius:10, borderColor:'#ddd', marginBottom: 16, padding: 8, color:"#000", fontWeight:'500' },
});
