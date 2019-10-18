const ipc = require('electron').ipcRenderer
import {getElement} from '../helper.js'

const SkillForm = () => {

  getElement('#cancel').onClick((e) => {
    e.preventDefault()
    ipc.send('cancel skill add')
  })

  getElement('form').onSubmit((e) => {
    e.preventDefault()
    const name = getElement('#nameInput').value
    const maxLvl = getElement('#maxLvl').value
    ipc.send('add skill', {name, maxLvl})
  })

}

export default SkillForm()