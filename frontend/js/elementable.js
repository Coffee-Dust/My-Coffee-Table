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

  static generateFormInputs() {
    return `
    <input type="hidden" name="type" value="FancyLink" class="elementable">
    <input type="text" name="url" placeholder="Website Link" class="elementable">
    <input type="text" name="textContent" placeholder="Text To Display" class="elementable">
    `
  }
}

class FancyIframe {

  constructor(element) {

  }

}