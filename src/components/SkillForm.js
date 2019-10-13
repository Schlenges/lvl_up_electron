const ipc = require('electron').ipcRenderer
import {create, getElement} from '../helper.js'

const SkillForm = () => {
  const state = {
    name: ""
  }

  const setName = (newName) => {
    state.name(newName)
    // render()
  }

  getElement('#cancel').onClick((e) => {
    e.preventDefault()
    ipc.send('cancel')
  })

  getElement('form').onSubmit((e) => {
    e.preventDefault()
    const name = getElement('#nameInput').value
    const maxLvl = getElement('#maxLvl').value
    ipc.send('add skill', {name, maxLvl})
  })

  /* const render = () => {
    const form = create('form')
    const label = create('label')
    label.element.addAttribute('for', 'skillInput')
    const input = create('input')
    input.setId('name')
    input.element.addAttribute('type', 'text')
    input.element.addAttribute('name', 'skillName')

  } */

}

// getElement('#form-root').add(SkillForm())

export default SkillForm()