"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_display_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/display.js */ \"./src/modules/display.js\");\n/* harmony import */ var _modules_eventListeners_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/eventListeners.js */ \"./src/modules/eventListeners.js\");\n\n\n//import './style.css';\n\nconst form = document.getElementById('list_form');\nconst clearSelected = document.getElementById('clear_selected');\n\nform.addEventListener('submit', _modules_eventListeners_js__WEBPACK_IMPORTED_MODULE_1__.inputValue);\nclearSelected.addEventListener('click', _modules_eventListeners_js__WEBPACK_IMPORTED_MODULE_1__.clearSelectOnly);\n\n(0,_modules_display_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n\n//# sourceURL=webpack://todo_list/./src/index.js?");

/***/ }),

/***/ "./src/modules/display.js":
/*!********************************!*\
  !*** ./src/modules/display.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ displayList)\n/* harmony export */ });\n/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ \"./src/modules/storage.js\");\n\n\nconst listCont = document.getElementById('list');\n\nfunction displayList() {\n  const list = (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.fromLocalStorage)();\n  listCont.innerHTML = '';\n  list.forEach((item, listIndex) => {\n    const li = document.createElement('li');\n    li.dataset.index = item.index;\n    li.classList.add('list_item');\n\n    const checkLabel = document.createElement('div');\n    checkLabel.classList.add('list_con');\n    li.appendChild(checkLabel);\n\n    const checkBoxElement = document.createElement('input');\n    checkBoxElement.type = 'checkbox';\n    checkBoxElement.checked = item.completed;\n    checkBoxElement.dataset.description = item.description;\n    checkBoxElement.dataset.index = item.index;\n    checkLabel.appendChild(checkBoxElement);\n\n    const labelElement = document.createElement('div');\n    labelElement.classList.add('label');\n    labelElement.textContent = item.description;\n    labelElement.dataset.index = item.index;\n    labelElement.contentEditable = false;\n    checkLabel.appendChild(labelElement);\n\n    const buttonCont = document.createElement('div');\n    buttonCont.classList.add('button_cont');\n    li.appendChild(buttonCont);\n\n    const editButton = document.createElement('button');\n    editButton.classList.add('edit_btn');\n    editButton.innerHTML = '<i class=\"fa-solid fa-ellipsis-vertical\"></i>';\n    editButton.dataset.index = item.index;\n    buttonCont.appendChild(editButton);\n\n    const removeButton = document.createElement('button');\n    removeButton.classList.add('remove_btn');\n    removeButton.dataset.index = item.index;\n    removeButton.innerHTML = '<i class=\"fa-sharp fa-solid fa-trash\"></i>';\n    buttonCont.appendChild(removeButton);\n\n    const checkBoxFunc = () => {\n      if (checkBoxElement.checked) {\n        list[listIndex].completed = true;\n        localStorage.setItem('list', JSON.stringify(list));\n        labelElement.style.textDecoration = 'line-through';\n        labelElement.style.color = 'red';\n      } else {\n        list[listIndex].completed = false;\n        localStorage.setItem('list', JSON.stringify(list));\n        labelElement.style.color = 'green';\n        labelElement.style.textDecoration = 'none';\n      }\n    };\n\n    const removeTarget = (e) => {\n      const isClickInside = removeButton.contains(e.target) || editButton.contains(e.target);\n      if (!isClickInside) {\n        removeButton.style.display = 'none';\n        editButton.style.display = 'block';\n      }\n    };\n\n    const labelTarget = (e) => {\n      const isClickInside = li.contains(e.target) || labelElement.contains(e.target);\n      if (!isClickInside) {\n        labelElement.contentEditable = false;\n        li.style.background = 'none';\n      }\n    };\n\n    const editSave = (e) => {\n      if (e.key === 'Enter') {\n        e.preventDefault();\n        list[listIndex].description = labelElement.textContent;\n        localStorage.setItem('list', JSON.stringify(list));\n      }\n    }\n    \n    const editFunc = () => {\n      li.style.background = 'yellow';\n      removeButton.style.display = 'block';\n      editButton.style.display = 'none';\n\n      document.addEventListener('click', removeTarget);\n\n      labelElement.contentEditable = true;\n      labelElement.addEventListener('keydown', editSave);\n\n      document.addEventListener('click', labelTarget);\n    }\n\n    const removeFunc = () => {\n      list.splice(listIndex, 1);\n      localStorage.setItem('list', JSON.stringify(list));\n\n      for (let i = 0; i < list.length; i += 1) {\n        list[i].index = i + 1;\n        localStorage.setItem('list', JSON.stringify(list));\n      }\n\n      listCont.removeChild(li);\n    };\n\n    window.addEventListener('DOMContentLoaded', checkBoxFunc);\n\n    checkBoxElement.addEventListener('change', checkBoxFunc);\n\n    editButton.addEventListener('click', editFunc);\n\n    removeButton.addEventListener('click', removeFunc);\n\n    listCont.appendChild(li);\n  });\n}\n\n//# sourceURL=webpack://todo_list/./src/modules/display.js?");

/***/ }),

/***/ "./src/modules/eventListeners.js":
/*!***************************************!*\
  !*** ./src/modules/eventListeners.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"clearSelectOnly\": () => (/* binding */ clearSelectOnly),\n/* harmony export */   \"inputValue\": () => (/* binding */ inputValue)\n/* harmony export */ });\n/* harmony import */ var _display_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display.js */ \"./src/modules/display.js\");\n/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ \"./src/modules/storage.js\");\n\n\n\nconst toAdd = document.getElementById('toAdd');\nconst form = document.getElementById('list_form');\n\nconst inputValue = (e) => {\n  e.preventDefault();\n\n  if (toAdd.value) {\n    (0,_storage_js__WEBPACK_IMPORTED_MODULE_1__.toLocalStorage)(toAdd.value);\n    (0,_display_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  }\n\n  form.reset();\n};\n\nconst clearSelectOnly = () => {\n  let list = JSON.parse(localStorage.getItem('list')) || [];\n  list = list.filter((item) => !item.completed);\n  localStorage.setItem('list', JSON.stringify(list));\n\n  for (let i = 0; i < list.length; i += 1) {\n    const list = JSON.parse(localStorage.getItem('list')) || [];\n    list[i].index = i + 1;\n    localStorage.setItem('list', JSON.stringify(list));\n  }\n\n  (0,_display_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n};\n\n\n//# sourceURL=webpack://todo_list/./src/modules/eventListeners.js?");

/***/ }),

/***/ "./src/modules/storage.js":
/*!********************************!*\
  !*** ./src/modules/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fromLocalStorage\": () => (/* binding */ fromLocalStorage),\n/* harmony export */   \"toLocalStorage\": () => (/* binding */ toLocalStorage)\n/* harmony export */ });\nfunction toLocalStorage(toAdd) {\n  const list = JSON.parse(localStorage.getItem('list')) || [];\n  const listObject = {\n    description: toAdd,\n    completed: false,\n    index: list.length + 1,\n  };\n\n  list.push(listObject);\n  localStorage.setItem('list', JSON.stringify(list));\n  localStorage.removeItem('todoList');\n\n  return list;\n}\n\nfunction fromLocalStorage() {\n  const list = JSON.parse(localStorage.getItem('list')) || [];\n\n  return list.map((list, listIndex) => ({\n    description: list.description,\n    completed: list.completed,\n    index: listIndex + 1,\n  }));\n}\n\n\n//# sourceURL=webpack://todo_list/./src/modules/storage.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);