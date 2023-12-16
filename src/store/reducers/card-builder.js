import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cardData: {
        cardName: 'Untitled Card'
    }
}

export const cardBuilder = createSlice({
    name: 'cardBuilder',
    initialState,
    reducers: {
        initializeCardData: (state, action)=>{
            state.cardData = action.payload;
        },

        updateCardData: (state, action) => {
            const { path, value } = action.payload;
            
            const pathArray = path.split('.');
            let nestedObject = state.cardData;

            for (let i = 0; i < pathArray.length - 1; i++) {
                if (!nestedObject[pathArray[i]]) {
                    nestedObject[pathArray[i]] = {};
                }
                nestedObject = nestedObject[pathArray[i]];
            }

            nestedObject[pathArray[pathArray.length - 1]] = value;
        },
    }
})

export const {updateCardData, initializeCardData} = cardBuilder.actions;

export default cardBuilder.reducer;