const menuBtns = document.querySelectorAll(".nav__item > button"),
  outputArea = document.querySelector(".output"),
  filenameTitle = document.querySelector("h2 .filename-title"),
  tocBtns = document.querySelectorAll(".toc__item button");
let editor,
  isMenuOpen = false,
  currentTitle;

// MENU

function onMenuBtnClick(e) {
  e.preventDefault();
  isMenuOpen = e.target.parentElement.classList.toggle("nav__item--open");
}

function onMenuBtnMouseover(e) {
  e.preventDefault();
  if (isMenuOpen) {
    for (let b of menuBtns) {
      b.parentElement.classList.remove("nav__item--open");
    }
    e.target.parentElement.classList.add("nav__item--open");
    e.target.focus();
  }
}

function onMenuBtnBlur(e) {
  e.preventDefault();
  e.target.parentElement.classList.remove("nav__item--open");
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
    fetch("examples/" + filename + ".poegram"),
    fetch("examples/" + filename + ".output")
  ])
  .then(results => Promise.all(results.map(r => r.text())))
  .then(([poegram, output]) => {
    editor.getDoc().setValue(poegram);
    outputArea.innerText = output;
    filenameTitle.innerText = filename;
    currentTitle = filenameTitle;
    for (let btn of tocBtns) {
      btn.parentElement.classList.remove("current");
    }
    document.querySelector("button[value=\"" + filename + "\"]").parentElement.classList.add("current");
  })
  .catch(err => console.log(err));
}

// MAIN

document.addEventListener("DOMContentLoaded", () => {
  // set up editor
  editor = CodeMirror(document.querySelector(".editor"), {
    lineNumbers: true,
    styleActiveLine: true,
    styleSelectedText: true
  });

  load("Looking");

  menuBtns.forEach(button => {
    button.addEventListener("click", onMenuBtnClick);
    button.addEventListener("mouseover", onMenuBtnMouseover);
    button.addEventListener("blur", onMenuBtnBlur);
  });

  tocBtns.forEach(btn => {
    btn.addEventListener("click", onTocBtnClick);
  });
});