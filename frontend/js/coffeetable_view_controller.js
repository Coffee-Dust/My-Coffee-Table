class CoffeeTableViewController {

  constructor(coffeeTable) {
    this.coffeeTable = coffeeTable
    this.view = document.querySelector("#coffee_table_view")
    this.editModeIsActive = false

    if (!this.view) {
      throw new Error(`Could not find HTMLElement #coffee_table_view`)
    }
    this.displayEditButton()

    // Drag Events //

    new DragEvent(this)
  }

  // Element Node CRUD Functions //
  loadElements() {
    for (const element of this.coffeeTable.elements) {
      this.view.appendChild(element.node)
    }
  }

  addElement(element) {
    this.coffeeTable.elements.push(element)
    this.view.appendChild(element.node)
  }

  updateElement(element) {
    element.node.remove()
    element.node = element.createNode()
    this.view.appendChild(element.node)
  }

  removeElement(element) {
    const index = this.coffeeTable.elements.findIndex(ctElement => ctElement.data.id === element.id)
    this.coffeeTable.elements[index].node.remove()
    this.coffeeTable.elements.splice(index, 1)
  }

  // Edit Mode Functions //

  onEditModeIsActive(eventButton) {
    // New Element Button Creation
    const newElementButton = document.querySelector("#new_element_button")
    if (!newElementButton) {
      const btn = document.createElement("button")
      btn.id = "new_element_button"; btn.textContent = "Add New Element"
      btn.addEventListener("click", (event)=>{
        this.displayNewElementPopup(event)
      })
      this.view.appendChild(btn)
    } else {
      newElementButton.hidden = false
    }
    // ---------------------------
    for (const element of this.coffeeTable.elements) {
      element.editBar.hidden = false
    }

  }

  onEditModeIsExited(eventButton) {
    document.querySelector("#new_element_button").hidden = true

    for (const element of this.coffeeTable.elements) {
      element.editBar.hidden = true
    }
  }

  // MISC UI Functions //
  displayEditButton() {
    const btn = document.createElement("button")
    btn.id = "edit_button"; btn.textContent = "Edit Mode"
    btn.addEventListener("click", (event)=>{
      if (this.editModeIsActive) {
        this.editModeIsActive = false
        event.target.textContent = "Edit Mode"
        this.onEditModeIsExited(event.target)
      } else {
        this.editModeIsActive = true
        event.target.textContent = "Exit Edit Mode"
        this.onEditModeIsActive(event.target)
      }
    })
    this.view.appendChild(btn)
  }

  displayNewElementPopup(event) {
    View.presentPopup((popupParent)=>{
      for (const type of Element.types) {
        const elementTypeBtn = document.createElement("button")
        elementTypeBtn.textContent = `New ${type}`

        elementTypeBtn.addEventListener("click", (event)=>{
          if (!elementTypeBtn.querySelector("form")) {
            elementTypeBtn.appendChild(Element.generateFormForTypeOn(type))
          }
        })
        popupParent.appendChild(elementTypeBtn)
      }
    })
  }

  set coffeeTable(tableClass) {
    if (tableClass.constructor.name === "CoffeeTable") {
      this._coffeeTable = tableClass
    } else {
      console.log(this)
      throw new Error(`Tried to set an instance of ${tableClass.constructor.name} to this.coffeeTable`)
    }
  }

  get coffeeTable() {
    return this._coffeeTable
  }

  static fixTableSize() {
    setSize()
    window.addEventListener("resize", setSize)
    function setSize() {
      document.querySelector("#coffee_table_view").style.height = window.innerHeight + "px"
    }
  }

}