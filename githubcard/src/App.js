import React, { Component } from 'react';
import Card from './Card'
import axios from 'axios';

class App extends Component {
state={
  user: [],
  search: ''
}

componentDidMount(){
  axios.get('https://api.github.com/users/justinfineberg')
  .then(res=>{
    console.log(res.data)
    this.setState({
      ...this.state,
      user: res.data
    })
  })
  .catch(err=>{
    console.log(err)
  })
}

handleChange = (e) =>{
  this.setState({
    ...this.state,
    search: e.target.value
  })
}

handleSubmit = (e) =>{
  e.preventDefault();
  axios.get(`https://api.github.com/users/${this.state.search}`)
  .then(res=>{
    this.setState({
      ...this.state,
      user: res.data
    })

  })
  .catch(err=>{
    alert('Not a Valid username')
  })
}

secondLink = (login) =>{
  this.setState({
    ...this.state,
    search: login
  })
  console.log(`https://api.github.com/users/${login}`)
   axios.get(`https://api.github.com/users/${login}`)
  .then(res=>{
    this.setState({
      ...this.state,
      user: res.data
    })
  })

}



  render() {
    return (
      
      <div className="flex flex-col">
         <h1 className="text-3xl m-auto border-8 w-full bg-yellow-200 p-4 mt-3 text-center">Stalk a GitHub User</h1>
        <form onSubmit={this.handleSubmit} className="text-2xl m-auto p-4 mt-3 text-center">
          <input value={this.state.search} onChange={this.handleChange} placeholder="Enter github username" className="border-4" type="text" />
          <button>Search</button>
         
        </form>
        <Card secondLink={this.secondLink} username={this.state.user.login} name={this.state.user.name} followers={this.state.user.followers} following={this.state.user.following} image={this.state.user["avatar_url"]} />
      </div>
    );
  }
}

export default App;
