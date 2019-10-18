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
  addClass: (className) => element.setAttribute('class', className),
  addStyle: (attribute, value) => element.style[attribute] = value,
  add: (childEl) => element.appendChild(childEl.element),
  remove: (childEl) => element.removeChild(childEl.element),
  // addHtml: (html) => element.innerHTML += html,
  replace: (newEl, oldEl) => element.replaceChild(newEl.element, oldEl.element),
  onClick: (clickHandler) => element.addEventListener('click', clickHandler),
  onSubmit: (submitHandler) => element.addEventListener('submit', submitHandler)
})

export {create, getElement}