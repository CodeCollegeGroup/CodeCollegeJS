const actionTypes = {
  APP: {
    SWITCHNAVDRAWER: 'app/drawer_toggle',
    MENUTOGGLE: 'app/menu_toggle',
  },
  MENU: {
    TOGGLEMENU: 'menu/toggle_side_menu',
    REQUESTCHANGE: 'menu/change_side_menu',
  },
  REGISTER: {
    POST: 'register/post',
    FAIL: 'register/fail',
    SUCCESS: 'register/success',
  },
  LOGIN: {
    POST: 'login/post',
    FAIL: 'login/fail',
    SUCCESS: 'login/success',
  },
  LOGOUT: 'logout',
  PASSWORD: {
    CHANGE: 'password/change',
    SUCCESS: 'password/success',
    FAIL: 'password/fail',
    RESET: 'password/reset',
    SNACKCLOSE: 'password/snack',
    UNMOUNT: 'password/unmount'
  },
  REFRESH_LOGIN: 'refresh_token',
  RESETFORMSTORES: 'reset_stores_forms',
  USERFEEDBACK: 'user_feedback',
};

export default actionTypes;
