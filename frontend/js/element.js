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
    return node
  }

  createElementableNode() {
    switch (this.data.elementableType) {
      case "FancyLink":
        return new FancyLink(this).node
      default:
        throw new Error(`Elementable: ${this.data.elementableType} was not a known type`)
    }
  }

  // Class Methods

  static create(data) {
    return new AjaxCall(`/users/${self.currentUser.id}/coffee_table/elements`).postData({element: data}, ()=>{}).then((data)=>{
      if (data.errors) {
        return data
      } else {
        return new this(data)
      }
    })
  }


  static generateFormForTypeOn(type) {
    const form = document.createElement("form")

    // This will get the elementable inputs from their class //
    const elementableInputs = function() {
      switch (type) {
        case "FancyLink":
          return FancyLink.generateFormInputs()

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
      this.create(formData).then(element=>{
        if (!element.errors) {
          self.ctViewController.addElement(element)
        }
      })
    })

    return form
  }


  static get types() {
    return ["FancyLink"]
  }

}
