class User {

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