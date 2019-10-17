const create = (el) => {
  const element = document.createElement(el)
  return _setElementObject(element)
}

const getElement = (el) => {
  const element = document.querySelector(el)
  return element ? _setElementObject(element) : null
}

const _setElementObject = (element) => ({
  element: element,
  value: element.value,
  setText: (text) => element.innerText = text,
  setId: (id) => element.setAttribute('id', id),
  add: (childEl) => element.appendChild(childEl),
  addHtml: (html) => element.innerHTML += html,
  replace: (oldEl, newEl) => element.replaceChild(oldEl, newEl),
  onClick: (clickHandler) => element.addEventListener('click', clickHandler),
  onSubmit: (submitHandler) => element.addEventListener('submit', submitHandler)
})

export {create, getElement}