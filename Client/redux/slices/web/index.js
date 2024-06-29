import { createSlice } from "@reduxjs/toolkit";
import { restAllData } from "../commanAction";

const initialState = {
  loading: false,
  dashboard: {},
  logs: {},
  logUsers: {},
  customerList: {},
  deletedCustomer: {},
  supervisorList: {},
  staffList: {},
  blockedUser: {},
};

export const webSlice = createSlice({
  name: "web",
  initialState,
  extraReducers: (builder) => builder.addCase(restAllData, () => initialState),
  reducers: {
    getDashboard: (state) => {
      state.loading = true;
    },
    setDashboard: (state, action) => {
      state.loading = false;
      state.dashboard = action.payload;
    },
    addNewPost: (state) => {
      state.loading = true;
    },
    deleteAPost: (state) => {
      state.loading = true;
    },









    getLogs: (state) => {
      state.loading = true;
    },
    setLogs: (state, action) => {
      state.loading = false;
      state.logs = action.payload;
    },
    getLogUsers: (state) => {
      state.loading = true;
    },
    setLogUsers: (state, action) => {
      state.loading = false;
      state.logUsers = action.payload;
    },
    getCustomerList: (state) => {
      state.loading = true;
    },
    setCustomerList: (state, action) => {
      state.loading = false;
      state.customerList = action.payload;
    },
    deleteACustomer: (state) => {
      state.loading = true;
    },
    setDeletedCustomer: (state, action) => {
      state.loading = false;
      state.deletedCustomer = action.payload;
    },
    sendUserNotification: (state) => {
      state.loading = true;
    },
    setSentUserNotification: (state, action) => {
      state.loading = false;
      // state.userNotifaction = action.payload;
    },
    getUserByID: (state) => {
      state.loading = true;
    },
    updateUser: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    ImageUpload: (state) => {
      state.loading = true;
    },
    getSupervisorList: (state) => {
      state.loading = true;
    },
    setSupervisorList: (state, action) => {
      state.loading = false;
      state.supervisorList = action.payload;
    },
    getStaffList: (state) => {
      state.loading = true;
    },
    setStaffList: (state, action) => {
      state.loading = false;
      state.staffList = action.payload;
    },
    blockUser: (state) => {
      state.loading = true;
    },
    setBlockUser: (state, action) => {
      state.loading = false;
      state.blockedUser = action.payload;
    },
    unblockUser: (state) => {
      state.loading = true;
    },
    onErrorStopLoad: (state) => {
      state.loading = false;
    },
    getUserPermissions: (state) => {
      state.loading = true;
    },
    updateUserPermission: (state) => {
      state.loading = true;
    },
    createSupervisor: (state) => {
      state.loading = true;
    },
    updateStaffRequest: (state) => {
      state.loading = true;
    },
    updateStaffSkills: (state) => {
      state.loading = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getDashboard,
  setDashboard,
  addNewPost,
  deleteAPost,

  getLogs,
  setLogs,
  getLogUsers,
  setLogUsers,
  setCustomerList,
  getCustomerList,
  deleteACustomer,
  setDeletedCustomer,
  sendUserNotification,
  setSentUserNotification,
  getUserByID,
  onErrorStopLoad,
  updateUser,
  ImageUpload,
  stopLoading,
  getSupervisorList,
  setSupervisorList,
  getStaffList,
  setStaffList,
  blockUser,
  setBlockUser,
  unblockUser,
  getUserPermissions,
  updateUserPermission,
  createSupervisor,
  updateStaffRequest,
  updateStaffSkills,
} = webSlice.actions;

export default webSlice.reducer;
