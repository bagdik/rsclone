import React, { Component } from 'react';

export default class SortMaterials extends Component {
  constructor(props) {
    super(props);

    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeTheme = this.onChangeTheme.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      type: 'All',
      theme: 'All',
    }
  }

  onChangeType(e) {
    const product = {
      type: e.target.value,
      theme: this.state.theme,
    }
    this.props.action(product);

    this.setState({
      type: e.target.value
    })
  }
  onChangeTheme(e) {


    const product = {
      type: this.state.type,
      theme: e.target.value,
    }
    this.props.action(product);
    this.setState({
      theme: e.target.value
    })

  }


  onSubmit(e) {
    e.preventDefault();
    this.props.sortLikes();
  }


  render() {
    return (
      <div className="m-2">

        <h3>Sort Material</h3>
        <form onSubmit={this.onSubmit} className="row g-3 align-middle">
          <div className="col-4">
            <label className="form-lable">Type: </label>
            <select
              className="form-control"
              defaultValue='All'
              onChange={this.onChangeType}
              required
            >
              <option value='All'>All</option>
              <option value='Video'>Video</option>
              <option value='Link'>Link</option>
              <option value='Book'>Book</option>

            </select>
          </div>
          <div className="col-4">
            <label>Theme: </label>
            <select
              className="form-control"
              defaultValue='All'
              onChange={this.onChangeTheme}
              required
            >
              <option value='All'>All</option>
              <option value='Html'>Html</option>
              <option value='Css'>Css</option>
              <option value='JS'>JS</option>
              <option value='Webpac'>Webpac</option>
              <option value='ES Lint'>ES Lint</option>
            </select>

          </div>
          <div className="col-4 align-self-end">
            <input type="button" value="Sort" onClick={this.props.sortLikes} className="btn btn-primary w-50" />
            <input type="button" value="Popular" onClick={this.props.sortPopular} className="btn btn-primary w-50" />
          </div>
        </form>
      </div>
    )
  }
}