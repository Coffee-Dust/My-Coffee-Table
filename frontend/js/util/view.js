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
  constructor(controller) {
    this.controller = controller
    this.view = controller.view
    this.active = false
    this.positionsDefault = {
      offset: { x: null, y: null }
    }
    this.view.addEventListener("mousedown", (e)=>this.dragStart(e))
    this.view.addEventListener("mousemove", (e)=>this.onDrag(e))
    this.view.addEventListener("mouseup", (e)=>this.dragEnd(e))
  }

  dragStart(event) {
    const node = event.target

    if (node.classList.contains("edit_bar") && this.controller.editModeIsActive) {
      this.element = this.controller.coffeeTable.elements.find((element)=> element.node.id === node.parentNode.id)
      this.active = true

      this.positions.offset.x = event.clientX - this.element.position.x
      this.positions.offset.y = event.clientY - this.element.position.y
    }
  }

  onDrag(event) {
    if (this.active && this.controller.editModeIsActive) {
      this.element.setPosition(event.clientX - this.positions.offset.x, event.clientY - this.positions.offset.y)
    }
  }

  dragEnd(event) {
    this.active = false;
    this.positions = this.positionsDefault
    this.element = null
  }

}