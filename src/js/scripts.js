import { view } from './codemirror/setup.js';

const navToggle = document.querySelector(".navToggle"),
  nav = document.querySelector(".nav"),
  menuHeaderBtns = document.querySelectorAll(".nav__item > button"),
  menuBtns = document.querySelectorAll(".nav__dropdown-item > button"),
  filenameTitle = document.querySelector(".filename-title"),
  exampleBtns = document.querySelectorAll(".example-item button"),
  regex = document.querySelector(".regex");
let isMenuOpen = false;

// MENU HEADERS

function onMenuHeaderClick(e) {
  e.preventDefault();
  let btn = e.currentTarget;
  isMenuOpen = btn.parentElement.classList.toggle("nav__item--open");
}

function onMenuHeaderMouseover(e) {
  e.preventDefault();
  let btn = e.currentTarget;
  if (isMenuOpen) {
    for (let b of menuHeaderBtns) {
      b.parentElement.classList.remove("nav__item--open");
    }
    btn.parentElement.classList.add("nav__item--open");
    btn.focus();
  }
}

function onMenuHeaderBlur(e) {
  // e.preventDefault();
  // let btn = e.currentTarget;
  // btn.parentElement.classList.remove("nav__item--open");
}

// MENU BTNS

function onMenuBtnClick(e) {
  e.preventDefault();
  isMenuOpen = false;
  let btn = e.currentTarget;
  btn.parentElement.parentElement.parentElement.classList.remove("nav__item--open");
}

function newFile() {
  setDoc("");
  filenameTitle.innerText = "Untitled";
}

function loadExample(e) {
  let filename = e.target.value;
  load(filename);
}

function load(filename) {
  fetch("./examples/" + filename + ".coem")
  .then(r => r.text())
  .then((code) => {
    setDoc(code);
    filenameTitle.innerText = filename;
  })
  .catch(err => console.log(err));
}

function openPopup(e) {
  regex.classList.add("visible");
}

function closePopup(e) {
  regex.classList.remove("visible");
}

// REFLECT

function handleError(e, source = "") {
  if (!e) return null;
  console.error(e);
  const { oneLiner, preErrorSection, errorSection, postErrorSection } = formatCoemError(e, source);
  let errorStr = oneLiner;
  if (errorSection) {
    errorStr += '<br />';
    errorStr += `${preErrorSection}<span class="error">${errorSection}</span>${postErrorSection}`;
  }
}

function reflect() {
  // https://github.com/danman113/YALI.js/blob/master/browser.js
  const source = view.state.doc.toString();
  console.log(source);
  const browserEnv = new Environment();
  output = "";
  try {
    // run(source, browserEnv, handleOutput);
    run(source, browserEnv);
    handleError(null);
  } catch (e) {
    handleError(e, source);
  }
}

// CHARACTER INPUT

function insert(str) {
  view.dispatch(view.state.replaceSelection(str));
  view.focus();
}

function setDoc(str) {
  view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: str } });
  view.focus();
}

// MAIN

document.addEventListener("DOMContentLoaded", () => {
  load("Reminder");

  // nav
  navToggle.addEventListener("click", e => {
    e.preventDefault();
    if (nav.classList.toggle("open")) {
      navToggle.innerText = "×";
    } else {
      navToggle.innerText = "☰";
    }
    document.body.classList.toggle("navIsOpen");
  });

  // menu headers
  menuHeaderBtns.forEach(btn => {
    btn.addEventListener("click", onMenuHeaderClick);
    btn.addEventListener("mouseover", onMenuHeaderMouseover);
    btn.addEventListener("blur", onMenuHeaderBlur);
  });

  // menu buttons
  menuBtns.forEach(btn => {
    btn.addEventListener("click", onMenuBtnClick);
  })

  // new
  document.querySelector("#newBtn").addEventListener("click", newFile);
  
  // examples
  exampleBtns.forEach(btn => {
    btn.addEventListener("click", loadExample);
  });

  // regex
  document.querySelector("#regexBtn").addEventListener("click", openPopup);
  document.querySelector(".backdrop").addEventListener("click", closePopup);

  // reflect
  document.querySelector("#reflectBtn").addEventListener("click", reflect);

  // character input
  document.querySelector("#clearBtn").addEventListener("click", () => setDoc(""));
  document.querySelector("#commentBtn").addEventListener("click", () => insert("† "));
  document.querySelector("#dashBtn").addEventListener("click", () => insert("—"));
  document.querySelector("#colonBtn").addEventListener("click", () => insert(":"));
  document.querySelector("#ampersandBtn").addEventListener("click", () => insert("&"));
  document.querySelector("#openQuoteBtn").addEventListener("click", () => insert("“"));
  document.querySelector("#closeQuoteBtn").addEventListener("click", () => insert("”"));
  document.querySelector("#pipeBtn").addEventListener("click", () => insert("|"));
  document.querySelector("#openParenBtn").addEventListener("click", () => insert("("));
  document.querySelector("#closeParenBtn").addEventListener("click", () => insert(")"));
  document.querySelector("#questionBtn").addEventListener("click", () => insert("?"));
  document.querySelector("#asteriskBtn").addEventListener("click", () => insert("*"));
  document.querySelector("#plusBtn").addEventListener("click", () => insert("+"));
});

document.addEventListener("keydown", e => {
  if (e.code === "Escape" && regex.classList.contains("visible")) {
    regex.classList.remove("visible");
  }
});