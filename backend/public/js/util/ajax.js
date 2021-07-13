class AjaxCall {
  
  constructor(url) {
    this.url = url
  }

  postData(body, failedValidationCallback, method="POST") {
    const config = {
      method: method,
      headers: { 
      "Content-Type": "application/json", 
      "Accept": "application/json"
      },
      body: JSON.stringify(body)
    }
    this.submittedObject = body

    return fetch(`${self.baseURL}${this.url}`, config).then(resp=>resp.json()).then(response=>{
      this.returnedObject = response

      if (this.returnedObject.errors) {
        // Object failed validation:
        console.error(`The data <${this.submittedObject}> has a validation error: `); console.error(this)
        failedValidationCallback(this.returnedObject)
        return Object.assign({}, this.returnedObject, {ajaxCall: this})
      } else {
        // It saved to the database!
        return this.returnedObject
      }
    })
  }

  getData() {
    return fetch(`${self.baseURL}${this.url}`).then(resp=>resp.json()).then(json=>this.returnedObject = json)
  }

}