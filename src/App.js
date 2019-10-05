const ipc = require('electron').ipcRenderer

const Skills = (skills) => {
  let skillContainer

  const render = () => {
    skillContainer = document.createElement('div')
    skillContainer.setAttribute('id', 'skillContainer')

    if(skills){
      if(skills.length > 0){
        skills.map((skill) => {
          const paragraph = document.createElement('p')
          paragraph.innerText = skill.name
          skillContainer.appendChild(paragraph)
        })
      } else {
        const alert = document.createElement('p')
        alert.innerText = "No skills to work on"
        skillContainer.appendChild(alert)
      }
    }

    return skillContainer
  }

  return render()
}

const App = () => {
  // STATE
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
      container = document.createElement('div')
      container.setAttribute('id', 'main')

      container.appendChild(Skills(state.skills))

      return container
    }

    container.replaceChild(Skills(state.skills), document.getElementById('skillContainer'))
  }

  return render()
}

export default App