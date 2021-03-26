class CoffeeTable {

  static loadForUser(user) {
    //load new view controller for user's coffeetable and assign to singleton that was declared on global/index.js
    new AjaxCall(`/users/${user.id}/coffee_table`).getData().then(coffeeTable=> {
      self.coffeeTableViewConroller = new CoffeeTableViewConroller(new CoffeeTable(coffeeTable))
    })
  }

}