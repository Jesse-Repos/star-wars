import React, { Component } from 'react';
import styles from './Stars.module.css';


class Stars extends Component {
  constructor(props) {
    super(props);
    this.makeApiCall = this.makeApiCall.bind(this);
    this.state = {
      isLoaded: false,
      items: [],
    };
  }
  async componentDidMount() {
    this.makeApiCall('https://swapi.dev/api/planets/');
  };

  async makeApiCall(url) {
    const res = await fetch(url);
    const json = await res.json();
    this.setState((prevState) => ({
      items: [...prevState.items, ...json.results]
    }))
    if (json.next) {
        this.makeApiCall(json.next);
      }
    else {
      this.setState({
        isLoaded: true,
      });
    }

    }

  render() {
    const { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
  }
}
}

export default Stars;
