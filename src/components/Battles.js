const ipc = require('electron').ipcRenderer
import {getElement, create} from '../helper.js'
import Skill from './Skill.js'

const Battle = (battle) => {
  const render = () => {
    const container = create('div')
    container.addClass('battle')
    container.setId(battle.id)

    const button = create('button')
    button.setText('+')
    button.onClick(() => ipc.send('update xp', battle))

    const name = create('span')
    name.addClass('battle-description')
    name.setText(battle.description)

    const xp = create('span')
    xp.addClass('xp')
    xp.setText(`${battle.xp} XP`)

    container.add(button)
    container.add(name)
    container.add(xp)

    return container
  }

  return render()

  /* `
  <div class="battles">
    <div class="battle">
      <span class="battle-name">${battle.description}</span>
      <span class="xp">${battle.xp} XP</span>
    </div>
  </div>
  ` */
}

const Battles = (skill, battles) => {
  const mainDiv = getElement('#main')
  const skills = getElement('#skillsContainer')
  let isShowing = false

  const render = () => {
    if(skills){
      mainDiv.remove(skills)
    }

    if(getElement(`#skill${skill.id}`)){
      return mainDiv.replace(Skill(skill), getElement(`#skill${skill.id}`))
    }

    mainDiv.add(Skill(skill))
    
    const battlesContainer = create('div')
    battlesContainer.addClass('battles')

    battles.map(battle => battlesContainer.add(Battle(battle)))
    
    const addBtn = create('button')
    addBtn.setId('add-battle')
    addBtn.setText('+')
    addBtn.onClick(() => {
      if(!isShowing){
        isShowing = true
        ipc.send('show battle form')
      }
    })

    battlesContainer.add(addBtn)

    mainDiv.add(battlesContainer)
  }

  ipc.on('closed battle form', () => isShowing = !isShowing)

  return render()
}

export default Battles