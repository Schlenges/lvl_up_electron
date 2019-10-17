const ipc = require('electron').ipcRenderer
import {getElement} from './helper.js'
import Skills from './components/Skills.js'

const MenuBtn = () => {
  const state = {
    isClosed: true
  }

  const setIsClosed = (val) => state.isClosed = val

  getElement('#menuBtn').onClick(() => {
    if(state.isClosed){
      setIsClosed(true)
      ipc.send('show menu')
    }
  })

  ipc.on('closed menu', (e, isClosed) => setIsClosed(isClosed))
}

const App = () => {
  const state = {
    skills: null
  }

  const setSkills = (newSkills) => {
    state.skills = newSkills
    render()
  }

  ipc.send('get skills')

  ipc.on('skills', (e, skills) => setSkills(skills))

  MenuBtn()

  const render = () => {
    if(!getElement('#skillsContainer')){
      return getElement('#main').add(Skills(state.skills))
    }

    getElement('#main').replace(Skills(state.skills), getElement('#skillsContainer').element)
  }

  return render()
}

export default App