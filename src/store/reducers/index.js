import { combineReducers } from "@reduxjs/toolkit";

import menu from './menu'
import app from './app'
import cardBuilder from './card-builder'

const reducers = combineReducers({ app, menu, cardBuilder })

export default reducers;