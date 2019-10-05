const create = (el) => {
  const element = document.createElement(el)

  let eObj = {
    element: element,
    setText: (text) => element.innerText = text,
    setId: (id) => element.setAttribute('id', id),
    add: (childEl) => element.appendChild(childEl),
    replace: (oldEl, newEl) => element.replaceChild(oldEl, newEl),
    onClick: (clickHandler) => element.addEventListener('click', clickHandler)
  }

  return eObj
}

export default create