class User {

  constructor(user_json) {
    if (!user_json.id) {
      console.error("Invalid object passed into User.contructor: ")
      console.error(user_json)
    }
    this.id = user_json.id
    this.name = user_json.name
    this.email = user_json.email
  }

  login() {
    CoffeeTable.loadForUser(this)
    self.currentUser = this
  }

  static addListeners() {
    this.addLoginFormListener()
    this.addSignupButtonListener()
  }

  static addLoginFormListener() {
    document.querySelector("#login_form").addEventListener("submit", (event)=>{
      event.preventDefault()

      new AjaxCall("/login").postData({email: event.target.user_email.value}, (error)=>{
        event.target.classList.toggle("field_with_errors")
        event.target.user_email.placeholder = "Could not find account!"
        setTimeout(function() {
          event.target.classList.toggle("field_with_errors")
          event.target.user_email.placeholder = "Enter your email."
        }, 69000)

      }).then(user=> { if (!user.errors) { new User(user).login() } })

    })
  }

  static addSignupButtonListener() {

    document.querySelector("#signup_button").addEventListener("click", (event)=>{

      View.presentPopup(popupNode=>{
        const h1 = popupNode.appendChild(document.createElement('h1')); h1.textContent = "Make a new account."
        const form = popupNode.appendChild(document.createElement('form'))

        const userAttrs = ["name", "email"]

        for (let i = 0; i < userAttrs.length; i++) {
          const attribute = userAttrs[i]
          const input = form.appendChild(document.createElement('input'))
          input.type = "text"; input.name = `${attribute}`; input.placeholder = `Enter your ${attribute}.`;

          if (i === userAttrs.length - 1) {
            const submit = form.appendChild(document.createElement('input'))
            submit.type = "submit"
          }
        }

        // Form submit event:
        form.addEventListener("submit", (event)=> {
          const formData = {
            user: {
              name: event.target.name.value,
              email: event.target.email.value
            }
          }
          event.preventDefault()
          new AjaxCall("/users").postData(formData, (validationError)=> alert(`Error. ${validationError.errors.full_messages}`)
          ).then(user => { if (!user.errors) { new User(user).login() } })
        })

      }) //endof presentPopup

    })
  }
  
}