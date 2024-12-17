import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setNotes } from '../redux/notesSlice';
import { getNotesFromStorage, saveNotesToStorage } from '../utils/storage';
import FloatingButton from '../components/FloatingButton';
import NoteItem from '../components/NoteItem';

export default function HomeScreen({ navigation }) {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchNotes() {
      const storedNotes = await getNotesFromStorage();
      dispatch(setNotes(storedNotes));
    }
    fetchNotes();
  }, []);

  useEffect(() => {
    saveNotesToStorage(notes);
  }, [notes]);

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedNotes = notes.filter(note => note.id !== id);
            dispatch(setNotes(updatedNotes)); // Update Redux
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteItem
            note={item}
            onPress={() => navigation.navigate('AddEditNote', { note: item })}
            onDelete={handleDelete}
          />
        )}
      />
      <FloatingButton onPress={() => navigation.navigate('AddEditNote')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
