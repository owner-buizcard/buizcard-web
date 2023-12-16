import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    config: null,
    contacts: [],
    cards: [],
    backgrounds: []
}


const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    initialize: (state, action)=>{
      console.log(action.payload);
        state.user = action.payload?.user;
        state.contacts = action.payload?.contacts;
        state.cards = action.payload?.cards;
        state.config = action.payload?.config;
    },
    updateCards: (state, action)=>{
        state.cards = action.payload;
        window.cards = action.payload;
    }
  }  
})

export const {initialize, updateCards} = app.actions;

export default app.reducer;