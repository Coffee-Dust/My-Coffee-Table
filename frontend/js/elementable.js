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

    this.data = element.data.elementable

    this.node = this.createNode()

  }

  createNode() {

  }

  static generateFormInputs() {
    return `
      <input type="hidden" name="type" value="FancyIframe" class="elementable">
      <input type="text" name="title" placeholder="Frame Title" class="elementable" />
      <input type="text" name="caption" placeholder="Frame Caption" class="elementable" />
      <input type="text" name="src" placeholder="Frame Website Source" class="elementable" />

      <input type="number" name="width" placeholder="Frame Size Width" class="elementable" />
      <input type="number" name="height" placeholder="Frame Size Height" class="elementable" />
    `
  }

}