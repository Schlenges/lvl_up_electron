const ipc = require('electron').ipcRenderer
import {getElement} from './helper.js'
import Skills from './components/Skills.js'
import Battles from './components/Battles.js'

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
    skills: null,
    selectedSkill: null,
    battles: null
  }

  const setSkills = (newSkills) => {
    state.skills = newSkills
    render()
  }

  const setSelectedSkill = (skill) => {
    state.selectedSkill = skill
    ipc.send('get battles', skill.id)
  }

  const setBattles = (battles) => {
    state.battles = battles
    render()
  }

  ipc.send('get skills')
  ipc.on('skills', (e, skills) => setSkills(skills))

  ipc.on('battles', (e, battles) => setBattles(battles))

  ipc.on('updated xp', (e, vals) => {
    setSkills(state.skills.map(skill => {
      if(skill.id === vals.skill_id){
        skill.curr_xp = vals.newXp
        skill.curr_lvl = vals.newLvl
      }
      return skill
    }))
  })


  MenuBtn()

  const render = () => {
    let skillsContainer = getElement('#skillsContainer')
    let mainContainer = getElement('#main')

    if(state.battles){
      return Battles(state.selectedSkill, state.battles, setBattles)
    }

    if(!skillsContainer){
      return mainContainer.add(Skills(state.skills, setSelectedSkill))
    }

    mainContainer.replace(Skills(state.skills, setSelectedSkill), skillsContainer)
  }

  return render()
}

export default App