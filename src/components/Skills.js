import {create} from '../helper.js'
import Skill from './Skill.js'

const Skills = (skills, setSelectedSkill) => {
  let skillsContainer

  const render = () => {
    skillsContainer = create('div')
    skillsContainer.setId('skillsContainer')

    if(skills){
      if(skills.length > 0){
        skills.map(skill => skillsContainer.add(Skill(skill, setSelectedSkill)))
      } else {
        const alert = create('p')
        alert.setText("No skills to work on")
        skillsContainer.add(alert)
      }
    }

    return skillsContainer
  }

  return render()
}

export default Skills