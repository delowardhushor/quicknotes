import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setNotes } from '../redux/notesSlice';
import { getNotesFromStorage, saveNotesToStorage } from '../utils/storage';
import FloatingButton from '../components/FloatingButton';
import NoteItem from '../components/NoteItem';
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function HomeScreen({ navigation }) {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(notes);


  useEffect(() => {
    async function fetchNotes() {
      const storedNotes = await getNotesFromStorage();
      dispatch(setNotes(storedNotes));
    }
    fetchNotes();
  }, []);

  useEffect(() => {
    saveNotesToStorage(notes);
    setFilteredNotes(notes); // Update filtered notes whenever notes change
  }, [notes]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredNotes(notes);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      setFilteredNotes(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(lowerCaseQuery) ||
            note.content.toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
  }, [searchQuery, notes]);

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

      <View style={{
        backgroundColor: '#222', paddingHorizontal: 10, marginBottom: 10, marginHorizontal:15, borderRadius: 10,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center',
                borderRadius:10,
      }} >
        <View  >
        <AntDesign name="search1" size={20} color="#f5f5f5"  />

        </View>
        <TextInput 
          placeholder='Search'
          style={{  color:'#f5f5f5', flex:1, marginLeft:5  }}
          placeholderTextColor="#555"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredNotes}
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
  container: { flex: 1, backgroundColor: '#111' },
});
