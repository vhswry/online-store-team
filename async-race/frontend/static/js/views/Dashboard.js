import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Async Race SPA");
  }

  async getHtml() {
    return `
            <h1>Async Race SPA</h1>
            <p>
              SPA to manage the collection of the cars, operate its engines, and show races statistics.
            </p>
            <p>
              <a href="/garage" data-link>View Garage</a>
              <a href="/winners" data-link>View Winners</a>
            </p>
        `;
  }
}