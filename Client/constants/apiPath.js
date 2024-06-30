const ApiPath = {
    AuthApiPath: {
      ADMIN_LOGIN: "log-in",
      USER_SIGNUP: "sign-up",

      VERIFY_OTP: "users/verify-otp" ,
      RESEND_OTP: "users/resend-otp",
      LOGOUT_ADMIN: "users/logout"
    },
    WebApiPath:{
      DASHBOARD_ADMIN: "/post",
      USERS: "/users",
      GET_USER_BY_ID: "/user/",
      UPDATE_USER_BY_ID: "user/info",










      GET_LOGS:"log_activity/all/filtered/logs",
      GET_LOG_USERS: "log_activity/filtered/logs/",
      GET_CUSTOMER_LIST: "users/customer/list",
      DELETE_A_CUSTOMER: "users/",
      SEND_USER_NOTIFICATION : "notifications/custom_notification",
      ATTACHMENT_UPLOAD: "user_photos/upload",
      GET_SUPERVISOR_LIST: "users/supervisor/list",
      GET_STAFF_LIST: "users/employee/list",
      BLOCK_USER: "block_user/block",
      UNBLOCK_USER: "block_user/unblock",
      GET_USER_PERMISSIONS: "permissions/",
      UPDATE_USER_PERMISSION: "permissions/update/",
      CREATE_SUPERVISOR: "users/create/supervisor",
      UPDATE_STAFF_REQUEST : "users/verify/",
      UPDATE_SKILLS: "user_skills/addDelete"
    }
  };
  
  export default ApiPath;
  