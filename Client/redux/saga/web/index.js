import { all, call, put, takeLatest } from "redux-saga/effects";
import { ApiClient } from "@/utilities/api";
import {
  onErrorStopLoad,
  setDashboard,
  setLogs,
  setLogUsers,
  setCustomerList,
  setDeletedCustomer,
  stopLoading,
  setSentUserNotification,
  setSupervisorList,
  setStaffList,
  setBlockUser
} from "../../slices/web";
import ApiPath from "@/constants/apiPath";
import { toast } from "react-toastify";

// Worker saga will be fired on USER_FETCH_REQUESTED actions

function* getDashboard(action) {
  try {
    const dataToSend = {...action.payload}
    delete dataToSend.cb
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.DASHBOARD_ADMIN),
      (action.params = { params: dataToSend })
    );
    if (resp.status) {
      yield put(setDashboard(resp));
      yield call(action.payload.cb, (action.res = resp));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}


function* addNewPost(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.DASHBOARD_ADMIN),
      (action.payload)
    );

    if (resp.status) {
      yield put(setSentUserNotification(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* deleteAPost(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.delete,
      (action.url = ApiPath.WebApiPath.DASHBOARD_ADMIN +"/"+ dataToSend?.id),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setDeletedCustomer(resp?.data));
      yield call(action.payload.cb, (action.res = resp?.data));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getSupervisorList(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.USERS),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setSupervisorList(resp));
      yield call(action.payload.cb, (action.res = resp?.data));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}


function* getUserByID(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_USER_BY_ID + action.payload?.id)
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}
















function* getLogs(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_LOGS),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setLogs(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getLogUsers(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_LOG_USERS + dataToSend?.id),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setLogUsers(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getCustomerList(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_CUSTOMER_LIST),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setCustomerList(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* deleteACustomer(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.delete,
      (action.url = ApiPath.WebApiPath.DELETE_A_CUSTOMER + dataToSend?.id),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setDeletedCustomer(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* sendUserNotification(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.SEND_USER_NOTIFICATION),
      (action.payload)
    );

    if (resp.status) {
      yield put(setSentUserNotification(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}



function* updateUser(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.patch,
      (action.url = ApiPath.WebApiPath.UPDATE_USER_BY_ID  + action.payload?.id),
      (action.payload)
    );
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* ImageUpload(action) {
  try {
    const resp = yield call(ApiClient.postFormData, action.url = ApiPath.WebApiPath.ATTACHMENT_UPLOAD, action.payload = action.payload);
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, action.res = resp?.data?.payload)
    }
    else {
      throw resp
    }
  } catch (e) {
    yield put(onErrorStopLoad())
    toast.error(e.response.data.msg);
  }
}

// function* getSupervisorList(action) {
//   try {
//     var dataToSend = { ...action.payload };
//     delete dataToSend.cb;
//     delete dataToSend.id;
//     const resp = yield call(
//       ApiClient.get,
//       (action.url = ApiPath.WebApiPath.GET_SUPERVISOR_LIST),
//       (action.params = { params: dataToSend })
//     );

//     if (resp.status) {
//       yield put(setSupervisorList(resp));
//       yield call(action.payload.cb, (action.res = resp?.data?.payload));
//       // toast.success(resp.data.message);
//     } else {
//       throw resp;
//     }
//   } catch (e) {
//     yield put(onErrorStopLoad());
//     toast.error(e?.response?.data?.msg);
//   }
// }

function* getStaffList(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_STAFF_LIST),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(setStaffList(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* blockUser(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.BLOCK_USER),
      (action.payload)
    );

    if (resp.status) {
      yield put(setBlockUser(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}


function* unblockUser(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.UNBLOCK_USER),
      (action.payload)
    );

    if (resp.status) {
      yield put(setBlockUser(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* getUserPermissions(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.WebApiPath.GET_USER_PERMISSIONS + action.payload?.id),
      (action.params = { params: dataToSend })
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* updateUserPermission(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.patch,
      (action.url = ApiPath.WebApiPath.UPDATE_USER_PERMISSION  + action.payload?.id),
      (action.payload)
    );
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* createSupervisor(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.CREATE_SUPERVISOR),
      (action.payload)
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* updateStaffRequest(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.patch,
      (action.url = ApiPath.WebApiPath.UPDATE_STAFF_REQUEST  + action.payload?.id),
      (action.payload)
    );
    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}



function* updateStaffSkills(action) {
  try {
    var dataToSend = { ...action.payload };
    delete dataToSend.cb;
    delete dataToSend.id;
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.WebApiPath.UPDATE_SKILLS),
      (action.payload)
    );

    if (resp.status) {
      yield put(stopLoading(resp?.data?.payload));
      yield call(action.payload.cb, (action.res = resp?.data?.payload));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

  
function* webSaga() {
  yield all([
    takeLatest("web/getDashboard", getDashboard),
    takeLatest("web/addNewPost", addNewPost),
    takeLatest("web/deleteAPost", deleteAPost),






    takeLatest("web/getLogs", getLogs),
    takeLatest("web/getLogUsers", getLogUsers),
    takeLatest("web/getCustomerList", getCustomerList),
    takeLatest("web/deleteACustomer", deleteACustomer),
    takeLatest("web/sendUserNotification", sendUserNotification),
    takeLatest("web/getUserByID", getUserByID),
    takeLatest("web/updateUser", updateUser),
    takeLatest("web/ImageUpload", ImageUpload),
    takeLatest("web/getSupervisorList", getSupervisorList),
    takeLatest("web/getStaffList", getStaffList),
    takeLatest("web/blockUser", blockUser),
    takeLatest("web/unblockUser", unblockUser),
    takeLatest("web/getUserPermissions", getUserPermissions),
    takeLatest("web/updateUserPermission", updateUserPermission),
    takeLatest("web/createSupervisor", createSupervisor),
    takeLatest("web/updateStaffRequest", updateStaffRequest),
    takeLatest("web/updateStaffSkills", updateStaffSkills),
  ]);
}

export default webSaga;
