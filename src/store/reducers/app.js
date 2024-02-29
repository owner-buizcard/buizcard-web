import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    fieldTypes: null,
    configs: null,
    isLoading: false,
    open: false,
    openMail: false,
    mailType: null,
    mailTitle: null,
    contacts: [],
    cards: [],
    backgrounds: [],
    plans: [],
    subs: {},
    analytics: null
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
        state.plans = action.payload?.config?.plans.sort((a, b) => a.order - b.order);
        state.subs = action.payload?.subscriptionMap;
    },
    updateCards: (state, action)=>{
        state.cards = action.payload;
        window.cards = action.payload;
    },
    updateContacts: (state, action)=>{
      state.contacts = action.payload;
    },
    updateAppUser: (state, action)=>{
      state.user = action.payload;
    },
    showLoader: (state)=>{
      state.isLoading = true;
    },
    hideLoader: (state)=>{
      state.isLoading = false;
    },
    updateAnalytics: (state, action)=>{
      state.analytics = action.payload;
    },
    openFeatureRequest: (state)=>{
      state.open = true;
    },
    closeFeatureRequest: (state)=>{
      state.open = false;
    },
    openMail: (state, action)=>{
      state.mailType = action.payload.type;
      state.mailTitle = action.payload.title;
      state.openMail = true;
    },
    closeMail: (state)=>{
      state.openMail = false;
    }
  }  
})

export const {initialize, updateCards, updateAnalytics, openMail, closeMail, updateContacts, updateAppUser, showLoader, hideLoader, openFeatureRequest, closeFeatureRequest} = app.actions;

export default app.reducer;