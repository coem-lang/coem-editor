const menuBtns = document.querySelectorAll(".nav__item > button"),
  outputArea = document.querySelector(".output"),
  filenameTitle = document.querySelector("h2 .filename-title"),
  tocItems = document.querySelector(".toc__items"),
  tocBtns = document.querySelectorAll(".toc__item button"),
  newBtn = document.querySelector("#newBtn");
let editor,
  isMenuOpen = false,
  currentTitle;

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
  editor.getDoc().setValue("");
  outputArea.innerHTML = "";
  for (let btn of tocBtns) {
    btn.parentElement.classList.remove("current");
  }
}

function createNewFile() {
  clear();
  let tocItem = document.querySelector(".toc__item").cloneNode(true);
  filenameTitle.innerText = "Untitled";
  currentTitle = filenameTitle;
  tocItem.querySelector(".filename-title").innerText = "Untitled";
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
    fetch("examples/" + filename + ".coem"),
    fetch("examples/" + filename + ".output")
  ])
  .then(results => Promise.all(results.map(r => r.text())))
  .then(([coem, output]) => {
    editor.getDoc().setValue(coem);
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

  newBtn.addEventListener("click", onNewBtnClick);
  // newBtn.addEventListener("click", e => {
  //   e.preventDefault();
  //   console.log(e);
  // });

  tocBtns.forEach(btn => {
    btn.addEventListener("click", onTocBtnClick);
  });
});