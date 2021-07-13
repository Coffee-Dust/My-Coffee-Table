self.baseURL = ""

User.addListeners()
CoffeeTableViewController.fixTableSize()

document.querySelector("#header_bar").addEventListener("mouseover", (event)=>{
  if (event.target.querySelector("nav")) {
    event.target.querySelector("nav").hidden = false
    event.target.classList.remove("animate_close")
  }
})

document.querySelector("#header_bar").addEventListener("mouseout", (event) => {
  if (self.currentUser) {
    event.target.querySelector("nav").hidden = true
    event.target.classList.add("animate_close")
  }
})

function headerBarHide(event) {
  
}

function headBarShow(params) {
  
}