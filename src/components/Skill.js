import {create} from '../helper.js'

const Skill = (skill, setSelectedSkill) => {
  let borderRadius = skill.curr_xp == 100 ? "5px" : null

  const render = () => {   
    const skillContainer = create('div')
    skillContainer.addClass('skill')
    skillContainer.setId('skill' + skill.id)

    const progressbar = create('div')
    progressbar.addClass('progressbar')

    const progress = create('span')
    progress.addClass('progress')
    progress.addStyle('width', skill.curr_xp + '%')
    progress.addStyle('borderRadius', borderRadius)

    progressbar.add(progress)

    const label = create('span')
    label.addClass('label')
    label.setText(skill.name)
    
    label.onClick(() => setSelectedSkill(skill))

    const lvlProgress = create('span')
    lvlProgress.addClass('lvl-progress')
    lvlProgress.setText(`LVL ${skill.curr_lvl}/${skill.max_lvl}`)

    skillContainer.add(progressbar)
    skillContainer.add(label)
    skillContainer.add(lvlProgress)

    return skillContainer
  }

/*   const render = () => (`
    <div class="skill" id="${skill.id}">
      <div class="progressbar">
        <span class="progress" style="width: ${skill.curr_xp}%; ${borderRadius}"></span>
      </div>
      <span class="label">${skill.name}</span>
      <span class="lvl-progress">LVL ${skill.curr_lvl}/${skill.max_lvl}</span>
    </div>
  `) */

  return render()
}

export default Skill