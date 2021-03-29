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

  static creationForm() {
    const form = document.createElement("form")
    form.innerHTML = `
    <input type="hidden" name="elementable[type]" value="FancyLink">
    <input type="text" name="elementable[url]" placeholder="Website Link">
    <input type="text" name="elementable[textContent]" placeholder="Text To Display">
    <input type="submit">
    `
    form.addEventListener("submit", (event) => {
      event.preventDefault()
      const formData = {}
      console.log(event.target)

      for (const input of event.target.elements) {
        console.log(input.name)
        formData[input.name] = input.value
      }
      console.log(formData)
    })
    return form
  }
}