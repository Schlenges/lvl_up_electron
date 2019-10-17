import {getElement, create} from '../helper.js'
import Skill from './Skill.js'

const Battle = (battle) => {

  const render = () => {
    const container = create('div')
    container.addClass('battle')
    container.setId(battle.id)

    const button = create('button')
    button.setText('+')

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

/*   `
  <div class="battles">
    <div class="battle">
      <span class="battle-name">${battle.description}</span>
      <span class="xp">${battle.xp} XP</span>
    </div>
  </div>
  ` */
  return render()
}

const Battles = (skill, battles) => {
  const mainDiv = getElement('#main')
  const skills = getElement('#skillsContainer')

  const render = () => {
    if(skills){
      mainDiv.remove(skills)
    }

    mainDiv.add(Skill(skill))
    const battlesContainer = create('div')
    battlesContainer.addClass('battles')

    battles.map(battle => battlesContainer.add(Battle(battle)))
    mainDiv.add(battlesContainer)
  }

  return render()
}

export default Battles