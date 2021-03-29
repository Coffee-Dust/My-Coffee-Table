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

  }

  static displayCreationFormForTypeOn(type, parent) {
    switch (type) {
      case "FancyLink":
        parent.appendChild(FancyLink.creationForm())
        break;
    
      default:
        break;
    }
  }

  static get types() {
    return ["FancyLink"]
  }

}
