import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  studentInfo: [],
  addStudent: {},
  editStudent: null,
};

export const SimpleSlice = createSlice({
  name: "SimpleSlice",
  initialState,
  reducers: {
    registerSimple: (state, actions) => {
      state.addStudent = actions.payload;
      const newEntry = {
        id: uuidv4(),
        ...state.addStudent,
      };
      const existingData = JSON.parse(localStorage.getItem("localData")) || [];
      existingData.push(newEntry);
      localStorage.setItem("localData", JSON.stringify(existingData));
    },
    loadFormData: (state) => {
      state.studentInfo = JSON.parse(localStorage.getItem("localData")) || [];
    },
    deleteStudent: (state, actions) => {
      const idToDelete = actions.payload;
      const existingData = JSON.parse(localStorage.getItem("localData")) || [];
      const updatedData = existingData.filter((student) => student.id !== idToDelete);
      localStorage.setItem("localData", JSON.stringify(updatedData));
      state.studentInfo = updatedData;
    },
    updateStudent: (state, actions) => {
      const { id, updatedData } = actions.payload;
      const existingData = JSON.parse(localStorage.getItem("localData")) || [];
      const updatedDataList = existingData.map(student => 
        student.id === id ? { ...student, ...updatedData } : student
      );
      localStorage.setItem("localData", JSON.stringify(updatedDataList));
      state.studentInfo = updatedDataList;
    },
    setEditStudent: (state, actions) => {
      state.editStudent = actions.payload;
    }
  },
});

export const { registerSimple, loadFormData, deleteStudent, updateStudent, setEditStudent } =
  SimpleSlice.actions;

export default SimpleSlice.reducer;
