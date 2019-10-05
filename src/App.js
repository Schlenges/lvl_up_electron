const ipc = require('electron').ipcRenderer

import create from './helper.js'
import Skills from './components/Skills.js'

const App = () => {
  // STATE
  const state = {
    skills: null
  }

  const setSkills = (newSkills) => {
    state.skills = newSkills
    render()
  }

  // GET DATA
  ipc.send('get skills', 'please get skills')

  ipc.on('skills', (event, skills) => {
    setSkills(skills)
  })

  // RENDER
  let container

  const render = () => {
    if(!document.getElementById('main')){
      container = create('div')
      container.setId('main')

      container.add(Skills(state.skills))

      return container.element
    }

    container.replace(Skills(state.skills), document.getElementById('skillContainer'))
  }

  return render()
}

export default App