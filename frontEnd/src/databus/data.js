class Page {
  constructor() {
    this.pageSize = 5
    this.currPage = 1
    this.currRoute = '#/index'
  }
  
  setCurrRoute(route) {
    this.currRoute = route
  }

  reset() {
    this.pageSize = 5
    this.currPage = 1
  }

  setCurrentPage(currPage) {
    this.currPage = currPage;
  }

}

export default new Page()