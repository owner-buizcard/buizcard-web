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
    featureCount: 0,
    cards: [],
    backgrounds: [],
    plans: [],
    subs: {},
    analytics: null,
    maxCards: 1,
    maxLeads: 3,
    enableEmailSignature: false,
    enableVirtualBackground: false,
    enableIntegration: false,
    enableExport: false,

    enableQrCodeLogo: false,
    cardAnalytics: false,
    brandingRemove: false,
    enableTags: false,
    analytics: false,
    personalizedLink: false,
    leadCapture: false,
    videos: false,
    designs: false,
    badges: false,
    followup: false,
}


const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    initialize: (state, action)=>{
        state.user = action.payload?.user;
        state.contacts = action.payload?.contacts;
        state.showMissedLeads = action.payload?.featureCount;
        state.cards = action.payload?.cards;
        state.fieldTypes = action.payload?.config?.fieldTypes;
        state.configs = action.payload?.config?.configs;
        state.plans = action.payload?.config?.plans?.sort((a, b) => a.order - b.order);
        state.backgrounds = action.payload?.backgrounds;
        state.subs = action.payload?.subscriptionMap;
        if(state.subs && state.subs['current'] && state.subs['current'][0]){
          const currentPlan = state.subs['current'][0];
          if(currentPlan.name=="Basic"){
            state.maxCards = 5;
            state.maxLeads = 5;
          }else {
            if(currentPlan.name=="Pro"){
              state.maxCards = 10;
              state.maxLeads = 250;
            }else{
              state.maxCards = 25;
              state.maxLeads = 1000;
              state.analytics= false;
              state.personalizedLink= false;
              state.leadCapture=  false;
              state.videos=  false;
              state.designs=  false;
              state.badges=  false;
              state.followup=  false;
            }
            state.enableIntegration = true;
            state.enableExport = true;
            state.enableQrCodeLogo= false;
            state.cardAnalytics = false;
            state.brandingRemove = false;
            state.enableTags = false;
          };
          state.enableEmailSignature = true;
          state.enableVirtualBackground = true;
        }
    },
    updateCards: (state, action)=>{
        state.cards = action.payload;
        window.cards = action.payload;
    },
    updateContacts: (state, action)=>{
      state.contacts = action.payload;
    },
    updateMissedLeads: (state, action)=>{
      state.showMissedLeads = action.payload;
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

export const {initialize, updateCards, updateAnalytics, openMail, closeMail, updateContacts, updateMissedLeads, updateAppUser, showLoader, hideLoader, openFeatureRequest, closeFeatureRequest} = app.actions;

export default app.reducer;