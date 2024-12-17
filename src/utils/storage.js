import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveNotesToStorage = async (notes) => {
  try {
    await AsyncStorage.setItem('notes', JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes:', error);
  }
};

export const getNotesFromStorage = async () => {
  try {
    const notes = await AsyncStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error('Error retrieving notes:', error);
    return [];
  }
};
