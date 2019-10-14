import {create} from '../helper.js'

const Skill = (skill) => {
  let borderRadius = skill.curr_xp == 100 ? "border-radius:5px" : null

  const render = () => (`
      <div class="skill" id="${skill.id}">
        <div class="progressbar">
          <span class="progress" style="width: ${skill.curr_xp}%; ${borderRadius}"></span>
        </div>
        <span class="label">${skill.name}</span>
        <span class="lvl-progress">LVL ${skill.curr_lvl}/${skill.max_lvl}</span>
      </div>
    `)

  return render()
}

const Skills = (skills) => {
  let skillsContainer

  const render = () => {
    skillsContainer = create('div')
    skillsContainer.setId('skillsContainer')

    if(skills){
      if(skills.length > 0){
        // skills.map((skill) => skillsContainer.add(Skill(skill)))
        skills.map(skill => skillsContainer.addHtml(Skill(skill)))
      } else {
        const alert = create('p')
        alert.setText("No skills to work on")
        skillsContainer.add(alert.element)
      }
    }

    return skillsContainer.element
  }

  return render()
}

export default Skills