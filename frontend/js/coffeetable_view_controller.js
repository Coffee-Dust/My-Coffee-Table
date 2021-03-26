class CoffeeTableViewController {

  constructor(coffeeTable) {
    this.coffeeTable = coffeeTable
    this.view = document.querySelector("#coffee_table_view")

    if (!this.view) {
      throw new Error(`Could not find HTMLElement #coffee_table_view`)
    }
  }

  loadElements() {
    for (const element of this.coffeeTable.elements) {
      this.view.appendChild(element.node)
    }
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