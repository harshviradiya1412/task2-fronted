import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerStudent = createAsyncThunk(
  "registerStudent",
  async (data) => {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/student/register",
      data
    );
    return response.data;
  }
);

export const loginStudent = createAsyncThunk("loginStudent", async (data) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/student/login",
      data
    );
    localStorage.setItem("loginData", JSON.stringify(response.data.data.name));
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const studentData = createAsyncThunk("studentData", async (data) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/student/get", {
      params: data,
    });
    console.log("response :>> ", response);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const deleteStudent = createAsyncThunk("deleteStudent", async (id) => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/student/delete/${id}`
    );
    return id;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const findData = createAsyncThunk("findData", async (id) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/student/find/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const updateData = createAsyncThunk("updateData", async (data) => {
  try {
    const response = await axios.patch(
      `http://127.0.0.1:8000/api/student/update/${data.id}`,
      data.formData
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
});

const initialState = {
  loginInfo: {
    status: "",
    data: "",
  },
  studentInfo: [],
  findStudent: {},
};

export const ApiSlice = createSlice({
  name: "apiSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginStudent.fulfilled, (state, action) => {
        state.loginInfo = {
          status: action.payload.status,
          data: action.payload.data.data.name,
        };
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.loginInfo = {
          status: "error",
          data: action.error.message,
        };
      })
      .addCase(studentData.fulfilled, (state, action) => {
        state.studentInfo = action.payload.data;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.studentInfo = state.studentInfo.filter(
          (student) => student._id !== action.payload
        );
      })
      .addCase(findData.fulfilled, (state, action) => {
        state.findStudent = action.payload.data;
      });
  },
});

export const { logout } = ApiSlice.actions;

export default ApiSlice.reducer;
