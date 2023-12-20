import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    config: null,
    isLoading: false,
    contacts: [],
    cards: [],
    backgrounds: []
}


const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    initialize: (state, action)=>{
        state.user = action.payload?.user;
        state.contacts = action.payload?.contacts;
        state.cards = action.payload?.cards;
        state.config = action.payload?.config;
    },
    updateCards: (state, action)=>{
        state.cards = action.payload;
        window.cards = action.payload;
    },
    showLoader: (state)=>{
      state.isLoading = true;
    },
    hideLoader: (state)=>{
      state.isLoading = false;
    }
  }  
})

export const {initialize, updateCards, showLoader, hideLoader} = app.actions;

export default app.reducer;