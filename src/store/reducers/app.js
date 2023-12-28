import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    fieldTypes: null,
    configs: null,
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
        state.fieldTypes = action.payload?.config?.fieldTypes;
        state.configs = action.payload?.config?.configs;
    },
    updateCards: (state, action)=>{
        state.cards = action.payload;
        window.cards = action.payload;
    },
    updateContacts: (state, action)=>{
      state.contacts = action.payload;
    },
    showLoader: (state)=>{
      state.isLoading = true;
    },
    hideLoader: (state)=>{
      state.isLoading = false;
    }
  }  
})

export const {initialize, updateCards, updateContacts, showLoader, hideLoader} = app.actions;

export default app.reducer;