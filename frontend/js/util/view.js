class View {
  static presentPopup(callback) {
    const popup = document.body.appendChild(document.createElement('div'))
    popup.id = "popupMenu"
    popup.style.height = window.innerHeight
    const popupBox = popup.appendChild(document.createElement('div'))

    callback(popupBox)
  }

}