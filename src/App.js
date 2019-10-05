const ipc = require('electron').ipcRenderer

import create from './helper.js'
import Skills from './components/Skills.js'

const MenuBtn = () => {
  let btn

  const state = {
    isOpen: false
  }

  const setIsOpen = (val) => {
    state.isOpen = val
    render()
  }

  const render = () => {
    btn = create('button')
    btn.setId('menuBtn')
    btn.setText('Menu')
    btn.onClick(() => {
      if(!state.isOpen){
        setIsOpen(true)
        ipc.send('show menu', 'please show menu')
      }
    })

    return btn.element
  }

  ipc.on('closed menu', (event, isOpen) => setIsOpen(isOpen))

  return render()
}

const App = () => {
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

      container.add(MenuBtn())
      container.add(Skills(state.skills))

      return container.element
    }

    container.replace(Skills(state.skills), document.getElementById('skillContainer'))
  }

  return render()
}

export default App