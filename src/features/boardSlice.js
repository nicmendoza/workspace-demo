import { createSlice } from '@reduxjs/toolkit'

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    notes: [],
  },
  reducers: {
    addNote: (state, action) => {
      // note mutation only allowed here because reduxjs/toolkit uses Immer under
      // the hood to maintain immutability
      const newNotes = (
        action.payload.length ? action.payload : [action.payload]
      )
        .map((n,i,arr) => ({
          id: state.notes.length + i,
          ...n,
        }))
      state.notes = state.notes.concat(newNotes)
    },
    removeNote: (state, action) => {
      state.notes.splice(state.notes.indexOf(action.payload))
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    updateNote: (state, { payload }) => {
      const note = [].slice.call(state.notes).filter(note=>note.id === payload.id)[0]
      if (note) {
        Object.assign(note, payload)
      }
    }
  }
})

export const { addNote, removeNote, setNotes, updateNote } = boardSlice.actions

export const selectNotes = state => state.board.notes

export default boardSlice.reducer