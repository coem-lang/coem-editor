const buttons = document.querySelectorAll(".nav__item > button");
let isMenuOpen = false;
buttons.forEach(button => {
  button.addEventListener("click", () => {
    isMenuOpen = button.parentElement.classList.toggle("nav__item--open");
  });
  button.addEventListener("mouseover", () => {
    if (isMenuOpen) {
      for (let b of buttons) {
        b.parentElement.classList.remove("nav__item--open");
      }
      button.parentElement.classList.add("nav__item--open");
      button.focus();
    }
  })
  button.addEventListener("blur", () => {
    button.parentElement.classList.remove("nav__item--open");
  })
})

// set up editor
let editor = CodeMirror(document.querySelector(".editor"), {
  lineNumbers: true,
  styleActiveLine: true,
  styleSelectedText: true,
  value: 'let me|I;\n\
let me be "looking";\n\
print I am "found";\n\
\n\
let se(e|a) be "blue";\n\
print see + " " + sea;\n\
\n\
let mis(t|sed) be "thick";\n\
print mist + " " + missed;\n\
\n\
let mou?rning be "dark";\n\
print morning is mourning;\n\
\n\
let answer be nothing;\n\
print answer;\n\
let answer be "this";\n\
print answer;\n\
let answer be "that";\n\
print answer;\n\
let answer be 42;\n\
print answer;\n\
\n\
let you be "here";\n\
let answer be you;\n\
print answer;',
});