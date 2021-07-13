document.addEventListener("DOMContentLoaded", function() {
  consoleLoadMessage()
  loadScriptFile("util/ajax.js")
  loadScriptFile("util/view.js")
  loadScriptFile("user.js")
  loadScriptFile("coffeetable_view_controller.js")
  loadScriptFile("coffee_table.js")
  loadScriptFile("element.js")
  loadScriptFile("elementable.js")

  loadScriptFile("index.js")
})

function loadScriptFile(filename) {
  console.log(`Loading Script: ${filename}`)
  var script = document.createElement('script');
  script.src = "./js/" + filename;
  document.body.appendChild(script)
}

function consoleLoadMessage() {

console.log(`%c
          /~~~~~~~~~~~~~~~~~~~/|
        /              /######/ / |
      /              /______/ /  |
      ========================= /||
      |_______________________|/ ||
      |  \\****/     \\__,,__/    ||
      |===\\**/       __,,__     ||    CoffeeDust.io site.
      |______________\\====/$____||    Status: brewing...
      |   ___        /~~~~\\ $  / |
      _|  |===|===   /      \\$_/  |
    | |  |###|     |########| | /
    |____\\###/______\\######/__|/
    ~~~~~~~~~~~~~~~~~~~~~~~~~~

`, "font-family:monospace")
}