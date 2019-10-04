const App = () => {
  const render = () => {
    const container = document.createElement('div')
    container.innerText = "Hello there!"
    return container
  }

  return render()
}

export default App