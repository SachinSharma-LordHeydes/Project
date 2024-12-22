import { createSlice} from "@reduxjs/toolkit";

const initialState={
  sectionData:null,
  allSectionData:null,
  subSectionData:''
}

export const courseSlice=createSlice({
  name:'course',
  initialState,
  reducers:{
    setSectionData:(state,action)=>{
      state.sectionData=action.payload
    }, 
    setAllSectionData:(state,action)=>{
      state.allSectionData=action.payload
    },
    setSubSectionData:(state,action)=>{
      state.subSectionData=action.payload
    },
  }
})


export const {setSectionData,setSubSectionData,setAllSectionData} = courseSlice.actions;

export default courseSlice.reducer;