import { createStore } from 'vuex'

const modules = {}

// Load all Vuex modules from the `modules` directory.
const moduleFiles = import.meta.globEager('./modules/*.js')
Object.keys(moduleFiles).forEach((filePath) => {
  const module = moduleFiles[filePath].default
  const moduleName = filePath.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  modules[moduleName] = module
})

// Create the Vuex store.
const store = createStore({
  modules,
})

export default store

