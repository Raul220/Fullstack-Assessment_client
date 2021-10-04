import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tagsReducer from '../../src/components/TagGenerator/Redux';
import sendTagReducer from '../../src/components/Editor/Redux';

export default configureStore({
  reducer: {
    counter: counterReducer,
    tags: tagsReducer,
    addTag: sendTagReducer
  },
})