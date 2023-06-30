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
  isMenuOpen = btn.closest(".nav__item")?.classList.toggle("nav__item--open");
}

function onMenuHeaderMouseover(e) {
  e.preventDefault();
  let btn = e.currentTarget;
  if (isMenuOpen) {
    for (let b of menuHeaderBtns) {
      b.closest(".nav__item")?.classList.remove("nav__item--open");
    }
    btn.closest(".nav__item")?.classList.add("nav__item--open");
    btn.focus();
  }
}

function onMenuHeaderBlur(e) {
  e.preventDefault();
  const open = document.querySelector(".nav__item--open");
  if (open) {
    open.classList.remove("nav__item--open");
  }
  isMenuOpen = false;
  // let btn = e.currentTarget;
  // btn.parentElement.classList.remove("nav__item--open");
}

// MENU BTNS

function onMenuBtnClick(e) {
  e.preventDefault();
  isMenuOpen = false;
  let btn = e.currentTarget;
  btn.closest(".nav__item")?.classList.remove("nav__item--open");
}

function newFile() {
  setDoc("");
  filenameTitle.innerText = "Untitled";
}

function loadFile() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".coem,.txt";
  input.addEventListener("input", e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const result = reader.result;
        setDoc(result);
        const SEPARATOR = ".";
        const filenameParts = file.name.split(SEPARATOR);
        const filename = filenameParts.slice(0, filenameParts.length - 1).join(SEPARATOR);
        filenameTitle.innerText = filename;
      }, false);
      reader.readAsText(file, "UTF-8");
    }
  });
  input.click();
}

function saveFile() {
  const text = view.state.doc.toString();
  const blob = new Blob([text], { type: "text/plain;charset=UTF-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const title = filenameTitle.innerText;
  a.download = `${title}.txt`;
  a.click();
}

function loadExample(e) {
  let filename = e.currentTarget.value;
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

// ECHO

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

function echo() {
  // https://github.com/danman113/YALI.js/blob/master/browser.js
  const source = view.state.doc.toString();
  console.log(source);
  const browserEnv = new Environment();
  try {
    // run(source, browserEnv, handleOutput);
    let echo = run(source, browserEnv);
    setDoc(echo);
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
  load("docks");

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
  });

  // menu buttons
  menuBtns.forEach(btn => {
    btn.addEventListener("click", onMenuBtnClick);
  })

  // file buttons
  document.querySelector("#newBtn").addEventListener("click", newFile);
  document.querySelector("#loadBtn").addEventListener("click", loadFile);
  document.querySelector("#saveBtn").addEventListener("click", saveFile);
  
  // examples
  exampleBtns.forEach(btn => {
    btn.addEventListener("click", loadExample);
  });

  // regex
  document.querySelector("#regexBtn").addEventListener("click", openPopup);
  document.querySelector(".backdrop").addEventListener("click", closePopup);

  // echo
  document.querySelector("#echoBtn").addEventListener("click", echo);

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
  if (e.code === "Escape") {
    if (regex.classList.contains("visible")) {
      regex.classList.remove("visible");
    }
    if (isMenuOpen) {
      const open = document.querySelector(".nav__item--open");
      if (open) {
        open.classList.remove("nav__item--open");
      }
      isMenuOpen = false;
    }
  }

  if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
    const open = document.querySelector(".nav__item--open");
    if (open) {
      const others = document.querySelectorAll(".nav__item");
      const index = Array.from(others).indexOf(open);
      let changeTo = null;
      if (e.code === "ArrowLeft" && index > 0) {
        changeTo = others[index - 1];
      } else if (e.code === "ArrowRight" && index < others.length - 1) {
        changeTo = others[index + 1];
      }
      if (changeTo) {
        open.classList.remove("nav__item--open");
        changeTo.classList.add("nav__item--open");
      }
    }
  }
});