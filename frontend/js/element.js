class Element {
  constructor(data) {
    this.data = data
    this.data.elementableType = data.elementable_type

    this.node = this.createNode()
  }

  createNode() {
    const node = document.createElement('div')
    node.id = `${this.data.elementableType}_${this.data.id}`
    node.className = this.data.className
    node.style.cssText = this.data.style.cssText
    node.appendChild(this.createElementableNode())

    const editBar = document.createElement('div')
    editBar.classList.add("edit_bar")
    editBar.hidden = true
    
    const editButton = document.createElement('button')
    editButton.textContent = "Edit"
    editButton.addEventListener("click", event=>{
      View.presentPopup(popupParent=>{
        const h2 = document.createElement("h2"); h2.textContent = `Editing ${this.data.elementableType}`
        popupParent.appendChild(h2)
        const form = Element.generateFormForTypeOn(this.data.elementableType, this)
        popupParent.appendChild(form)
      })
    })
    editBar.appendChild(editButton)

    const deleteButton = document.createElement('button')
    deleteButton.textContent = "Trash"
    deleteButton.addEventListener("click", _=> {
      this.delete()
    })
    editBar.appendChild(deleteButton)
    this.editBar = editBar
    node.appendChild(this.editBar)

    return node
  }

  createElementableNode() {
    switch (this.data.elementableType) {
      case "FancyLink":
        return new FancyLink(this).node
      case "FancyIframe":
        return new FancyIframe(this).node
      default:
        throw new Error(`Elementable: ${this.data.elementableType} was not a known type`)
    }
  }

  get position() {
    return { x: Number(this.node.style.left.split("px")[0]), y: Number(this.node.style.top.split("px")[0])}
  }

  setPosition(leftOffset, topOffset) {
    this.node.style.left = `${leftOffset}px`
    this.node.style.top = `${topOffset}px`
    this.data.style.cssText = this.node.style.cssText
  }

  updateWith(newData) {
    return new AjaxCall(`/users/${self.currentUser.id}/coffee_table/elements/${this.data.id}`)
      .postData({element: newData}, _=>{alert("Error Occurred While Updating.\nPlease Try Again.")}, "PATCH")
    .then(updatedData=> {
      if (!updatedData.errors && this.data.id === updatedData.id) {
        this.data = updatedData
        this.data.elementableType = updatedData.elementable_type
        return this
      } else {
        return updatedData
      }
    })
  }

  updatePosition() {
    return new AjaxCall(`/users/${self.currentUser.id}/coffee_table/elements/${this.data.id}`)
    .postData({element: {style_attributes: {cssText: this.data.style.cssText}}}, _=> {alert("Error Occurred While Updating Position.\nPlease Try Again.")}, "PATCH")
  }

  delete() {
    new AjaxCall(`/users/${self.currentUser.id}/coffee_table/elements/${this.data.id}`)
    .postData({}, _=>{alert("Something went wrong when deleting this element.\nPlease try again.")}, "DELETE")
    .then(element=> self.ctViewController.removeElement(element))
  }

  // Class Methods

  static create(data) {
    // Set default data
    if (data.style_attributes.cssText === "") {
      data.style_attributes.cssText = "top: 100px; left: 10px;"
    } else {
      data.style_attributes.cssText = "top: 100px; left: 10px; " + data.style_attributes.cssText
    }
    data.className = "element " + data.className
    
    return new AjaxCall(`/users/${self.currentUser.id}/coffee_table/elements`).postData({element: data}, ()=>{}).then((data)=>{
      if (data.errors) {
        return data
      } else {
        return new this(data)
      }
    })
  }


  static generateFormForTypeOn(type, elementToUpdate=null) {
    const form = document.createElement("form")

    // This will get the elementable inputs from their class //
    const elementableInputs = function() {
      switch (type) {
        case "FancyLink":
          return FancyLink.generateFormInputs()
        case "FancyIframe":
          return FancyIframe.generateFormInputs()
        default:
          break;
      }
    }

    form.innerHTML = `
    <input type="text" name="className" placeholder="className">
    <input type="text" name="cssText" placeholder="styleOverride">
    ${elementableInputs()}
    <input type="submit">
    `

    if (elementToUpdate) {
      // Pre-populate form with existing data.

      form.querySelector("input[name=cssText]").value = elementToUpdate.data.style.cssText
      form.querySelector("input[name=className]").value = elementToUpdate.data.className

      // Populate elementable data:
      for (const input of form.querySelectorAll(".elementable")) {
        if (input.name !== "type") {
          input.value = elementToUpdate.data.elementable[input.name]
        }
      }
    }
    
    form.addEventListener("submit", (event)=>{
      event.preventDefault()
      const formData = {
        coffee_table_id: self.ctViewController.coffeeTable.id,
        className: event.target.className.value,
        style_attributes: {cssText: event.target.cssText.value},
        elementable_attributes: {}
      }

      for (const input of event.target.querySelectorAll(".elementable")) {
        (input.name === "type") ? 
        formData["elementable_type"] = input.value
        :
        formData.elementable_attributes[input.name] = input.value
      }

      // Use Update method if elementToUpdate exists
      if (elementToUpdate) {
        elementToUpdate.updateWith(formData).then(element=>{
          if (!element.errors) {
            self.ctViewController.updateElement(element)
            View.removePopup()
          } else {
            //display validation errors:
          }
        })
      } else {
        this.create(formData).then(element=>{
          if (!element.errors) {
            self.ctViewController.addElement(element)
            View.removePopup()
          } else {
            //display validation errors:
          }
        })
      }
    })

    return form
  }


  static get types() {
    return ["FancyLink", "FancyIframe"]
  }

}
