import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const layoutComputed = {
  ...mapState('layout', {
    layoutType: (state) => state.layoutType,
    leftSidebarType: (state) => state.leftSidebarType,
    layoutWidth: (state) => state.layoutWidth,
    topbar: (state) => state.topbar,
    loader: (state) => state.loader
  })
}

export const globalMethods = mapActions('global', ['setLoader','setSite','setToken','getProducts'])

export const globalGetters = mapGetters('global', ['siteUrl','loader','currency','site','user','allProducts'])

export const authMethods = mapActions('auth', ['logIn', 'logOut', 'register', 'resetPassword'])

export const layoutMethods = mapActions('layout', ['changeLayoutType', 'changeLayoutWidth', 'changeLeftSidebarType', 'changeTopbar', 'changeLoaderValue'])

export const authFackMethods = mapActions('authfack', ['login', 'registeruser', 'logout'])

export const notificationMethods = mapActions('notification', ['success', 'error', 'clear'])

export const ordersMethods = mapActions('orders', ['setOrders','sendEmail','setPendingOrders','setShippedOrders'])

export const ordersGetters = mapGetters('orders', ['orders','loader','currentPage','totalOrdes'])

export const dashboardMethods = mapActions('dashboard', ['setDashboardData','setYearHistory','setSeries','setTodayOrdersHistory','setMonthlyOrdersHistory'])

export const dashboardGetters = mapGetters('dashboard', ['getData','yearHistory','newSeries','currentYearOrders','previousYearOrders','currentMonthOrders'])

export const orderMethods = mapActions('order', ['setOrder','editOrder','editStatus','editIntervention'])

export const orderGetters = mapGetters('order', ['productDetails','patientDetails','shippingInfo','shipping','patientMedicalQa','patientConfirmationQa','product','orderData'])

export const usersMethods = mapActions('users', ['setUsers'])

export const usersGetters = mapGetters('users', ['getUsers','currentPage','totalUsers'])

export const userMethods = mapActions('user', ['setUserdData'])

export const userGetters = mapGetters('user', ['userData','patient','shippingInfo'])

export const userOrdersdMethods = mapActions('userOrders', ['getUserOrders'])

export const userOrderGetters = mapGetters('userOrders', ['products','userData'])

export const intervensionMethods = mapActions('intervention', ['getInterventionOrders'])

export const intervensionGetters = mapGetters('intervention', ['orders','loader'])






