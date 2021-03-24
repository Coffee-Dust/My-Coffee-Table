class AjaxCall {
  constructor(url) {
    this.url = url
  }
  
  getData() {
    return fetch(`${self.baseURL}${this.url}`).then(resp=>resp.json()).then(json=>this.returnedObject = json)
  }
}