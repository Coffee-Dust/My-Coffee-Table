class FancyLink {
  constructor(element) {
    this.data = element.data.elementable

    this.node = this.createNode()

  }

  createNode() {
    const a = document.createElement("a")
    a.href = this.data.url
    a.textContent = this.data.textContent
    a.target = "_blank"

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
    const div = document.createElement("div")
    div.classList.add("fancy_iframe")

    const title = document.createElement("h4")
    title.textContent = this.data.title
    div.appendChild(title)
    const caption = document.createElement("p")
    caption.textContent = this.data.caption
    div.appendChild(caption)

    const iframe = document.createElement("iframe")
    iframe.src = this.data.src
    iframe.height = this.data.height
    iframe.width = this.data.width
    div.appendChild(iframe)

    return div
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