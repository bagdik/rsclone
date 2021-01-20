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
    this.setState({
      type: e.target.value
    })
  }
  onChangeTheme(e) {
    this.setState({
      theme: e.target.value
    })
  }
  

  onSubmit(e) {
    e.preventDefault();    
    const product = {     
        type: this.state.type,        
        theme: this.state.theme,      
    }
    this.props.action(product);
    console.log(product);

  }
  

  render() {   
    return (      
      <div>
        
        <h3>Create Material</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">            
            <label>Type: </label>
            <select 
                className="form-control"
                defaultValue='All'
                onChange={this.onChangeType}
                required            
                >
                  <option  value='All'>All</option>
                  <option  value='Video'>Video</option>
                  <option value='Link'>Link</option>
                  <option value='Book'>Book</option>

                </select>
            <label>Theme: </label>
            <select 
                className="form-control"
                defaultValue='All'
                onChange={this.onChangeTheme}
                required            
                >
                  <option  value='All'>All</option>
                  <option  value='Html'>Html</option>
                  <option value='Css'>Css</option>
                  <option value='JS'>JS</option>
                  <option value='Webpac'>Webpac</option>
                  <option value='ES Lint'>ES Lint</option>
                </select>
           
          </div>
          <div className="form-group">
            <input type="submit" value="Sort" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}