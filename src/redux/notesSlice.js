import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    setNotes(state, action) {
      return action.payload;
    },
    addNote: (state, action) => {
      state.unshift(action.payload);
    },
    updateNote: (state, action) => {
      const index = state.findIndex(note => note.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
  },
});

export const { setNotes, addNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;
