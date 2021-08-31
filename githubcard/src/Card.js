import React, { Component } from 'react';
import axios from 'axios';

class Card extends Component {
    state={
        followers: []
    }

    componentDidUpdate(){
        axios.get(`https://api.github.com/users/${this.props.username}/followers`)
        .then(res=>{
            this.setState({
                ...this.state,
                followers: res.data
            })
        })
    }

 
    
    render() {
    const { name, following, followers, image } = this.props
        return (
            <>
            <div className="border-8 rounded-lg w-1/3 m-auto flex flex-col p-3">
            <img className="m-auto rounded-full" width={200} src={image} />
            <h1 className="m-auto font-bold text-2xl" >{name}</h1>
            <div className="flex justify-evenly mt-3 w-2/3 items-center m-auto">
                <h5>Following: {following}</h5>
                <h5>Followers: {followers}</h5>
            </div>
            
           
            </div>
            <div className="m-auto mt-3 text-center animate-bounce">↓</div>
            <ul className="m-auto mt-2 text-center">
            Follower Break Down:
                {
                    this.state.followers.map(item=>{
                    return <li className="cursor-pointer hover:underline " onClick={e=>this.props.secondLink(item.login)}>{item.login}</li>
                    })
                }
            </ul>
            </>
        );
    }
}

export default Card;