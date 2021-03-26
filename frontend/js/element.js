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

}

class FancyLink {
  constructor(element) {
    this.data = element.data.elementable
    
    this.node = this.createNode()

  }
  
  createNode() {
    const a = document.createElement("a")
    a.href = this.data.url
    a.textContent = this.data.textContent

    return a
  }
}