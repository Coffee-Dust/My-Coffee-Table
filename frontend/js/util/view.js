class View {
  static presentPopup(callback) {
    const popup = document.body.appendChild(document.createElement('div'))
    popup.id = "popupMenu"
    popup.style.height = window.innerHeight
    const popupBox = popup.appendChild(document.createElement('div'))

    const closeButton = popupBox.appendChild(document.createElement('h2'))
    closeButton.classList.add("popupCloseButton"); closeButton.textContent = "x"
    closeButton.addEventListener("click", (event)=> {
      popup.remove()
    })

    callback(popupBox)
  }
  static removePopup() {
    document.querySelector("#popupMenu").remove()
  }

}

class DragEvent {

}