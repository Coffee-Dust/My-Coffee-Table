class CoffeeTable {

  constructor(tableData) {

    if(!tableData.id) {
      console.error("Did not receive valid CoffeeTable data for User: " + self.currentUser.id)
      console.error(tableData)
      new Error("Invalid Coffeetable Data")
    } 

    this.id = tableData.id
    this.nickname = tableData.nickname
    this.backgroundType = tableData.background_type
    this.elements = []

    for (const element of tableData.elements) {
      this.elements.push(new Element(element))
    }
  }

  static loadForUser(user) {
    new AjaxCall(`/users/${user.id}/coffee_table`).getData().then(coffeeTable=> {
      self.coffeeTableViewController = new CoffeeTableViewController(new CoffeeTable(coffeeTable))
    })
  }

}