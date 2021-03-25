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

      }).then(user=> new User(user).login() )

    })
  }
  
}