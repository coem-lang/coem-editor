import { view } from './codemirror/setup.js';

const menuBtns = document.querySelectorAll(".nav__item > button"),
  outputArea = document.querySelector(".output"),
  consoleArea = document.querySelector(".console"),
  filenameTitle = document.querySelector("h2 .filename-title"),
  tocItems = document.querySelector(".toc__items"),
  tocBtns = document.querySelectorAll(".toc__item button"),
  newBtn = document.querySelector("#newBtn"),
  reflectBtn = document.querySelector("#reflectBtn");
let editor,
  isMenuOpen = false,
  currentTitle = "Untitled",
  output = "";

// MENU

function onMenuBtnClick(e) {
  e.preventDefault();
  let btn = e.currentTarget;
  isMenuOpen = btn.parentElement.classList.toggle("nav__item--open");
}

function onMenuBtnMouseover(e) {
  e.preventDefault();
  let btn = e.currentTarget;
  if (isMenuOpen) {
    for (let b of menuBtns) {
      b.parentElement.classList.remove("nav__item--open");
    }
    btn.parentElement.classList.add("nav__item--open");
    btn.focus();
  }
}

function onMenuBtnBlur(e) {
  // e.preventDefault();
  // let btn = e.currentTarget;
  // btn.parentElement.classList.remove("nav__item--open");
}

function onNewBtnClick(e) {
  e.preventDefault();
  let btn = e.currentTarget;
  btn.parentElement.parentElement.parentElement.classList.remove("nav__item--open");
  isMenuOpen = false;
  createNewFile();
}

function clear() {
  view.dispatch({
    changes: {from: 0, to: view.state.doc.length, insert: ""}
  });
  outputArea.innerHTML = "";
  for (let btn of tocBtns) {
    btn.parentElement.classList.remove("current");
  }
}

function createNewFile() {
  clear();
  let tocItem = document.querySelector(".toc__item").cloneNode(true);
  filenameTitle.innerHTML = "Untitled";
  currentTitle = filenameTitle;
  tocItem.querySelector(".filename-title").innerHTML = "Untitled";
  tocItems.appendChild(tocItem);
}

// TOC

function onTocBtnClick(e) {
  e.preventDefault();
  let filename = e.target.value;
  load(filename);
}

// LOAD

function load(filename) {
  Promise.all([
    fetch("/examples/" + filename + ".coem"),
    fetch("/examples/" + filename + ".output")
  ])
  .then(results => Promise.all(results.map(r => r.text())))
  .then(([coem, output]) => {
    editor.getDoc().setValue(coem);
    outputArea.innerHTML = output;
    filenameTitle.innerHTML = filename;
    currentTitle = filenameTitle;
    for (let btn of tocBtns) {
      btn.parentElement.classList.remove("current");
    }
    document.querySelector("button[value=\"" + filename + "\"]").parentElement.classList.add("current");
  })
  .catch(err => console.log(err));
}

// REFLECT

function handleError(e, source = "") {
  if (!e) {
    consoleArea.innerHTML = "";
    return null;
  }
  console.error(e);
  const { oneLiner, preErrorSection, errorSection, postErrorSection } = formatCoemError(e, source);
  let errorStr = oneLiner;
  if (errorSection) {
    errorStr += '<br />';
    errorStr += `${preErrorSection}<span class="error">${errorSection}</span>${postErrorSection}`;
  }
  consoleArea.innerHTML = errorStr;
}

function handleOutput(txt) {
  output += txt + '\n';
  console.log(txt);
  outputArea.innerHTML = output;
}

function reflect() {
  // https://github.com/danman113/YALI.js/blob/master/browser.js
  const source = view.state.doc.toString();
  console.log(source);
  const browserEnv = new Environment();
  output = "";
  try {
    run(source, browserEnv, handleOutput);
    handleError(null);
  } catch (e) {
    handleError(e, source);
  }
}

// MAIN

document.addEventListener("DOMContentLoaded", () => {
  // load("Looking");

  // menuBtns.forEach(button => {
  //   button.addEventListener("click", onMenuBtnClick);
  //   button.addEventListener("mouseover", onMenuBtnMouseover);
  //   button.addEventListener("blur", onMenuBtnBlur);
  // });

  // newBtn.addEventListener("click", onNewBtnClick);
  
  // tocBtns.forEach(btn => {
  //   btn.addEventListener("click", onTocBtnClick);
  // });

  reflectBtn.addEventListener("click", reflect);
});

// NAV

const navToggle = document.querySelector(".navToggle");
const nav = document.querySelector(".nav");

navToggle.addEventListener("click", e => {
  e.preventDefault();
  if (nav.classList.toggle("open")) {
    navToggle.innerText = "×";
  } else {
    navToggle.innerText = "☰";
  }
  document.body.classList.toggle("navIsOpen");
});