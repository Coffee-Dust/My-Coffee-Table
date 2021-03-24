
document.addEventListener("DOMContentLoaded", function() {

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