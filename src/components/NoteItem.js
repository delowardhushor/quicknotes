import moment from 'moment';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function NoteItem({ note, onPress, onDelete }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.content} onPress={onPress}>
        <Text style={styles.title}  numberOfLines={1} >{note.title}</Text>
        <Text style={styles.date}>Updated {moment(new Date(note.updated)).fromNow()}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(note.id)}>
        <Icon name="delete" size={16} color="#ff0000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#222',
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowOpacity: 0.1, // Shadow for iOS
    shadowRadius: 4, // Shadow for iOS
    marginHorizontal:15,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f5f5f5',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  deleteButton: {
    width: 35,
    height: 35,
    borderRadius: 20, // Makes it round
    backgroundColor: '#111', // Red delete color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 3 }, // Shadow for iOS
    shadowOpacity: 0.3, // Shadow for iOS
    shadowRadius: 4, // Shadow for iOS
  },
});
