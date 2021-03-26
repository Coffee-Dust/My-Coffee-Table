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
    // node.appendChild(this.createElementableNode())
    return node
  }
}