import {create} from '../helper.js'

const Skill = (skill) => {
  const render = () => {
    const paragraph = create('p')
    paragraph.setText(skill.name)

    return paragraph.element
  }

  return render()
}

const Skills = (skills) => {
  let skillContainer

  const render = () => {
    skillContainer = create('div')
    skillContainer.setId('skillContainer')

    if(skills){
      if(skills.length > 0){
        skills.map((skill) => skillContainer.add(Skill(skill)))
      } else {
        const alert = create('p')
        alert.setText("No skills to work on")
        skillContainer.add(alert.element)
      }
    }

    return skillContainer.element
  }

  return render()
}

export default Skills