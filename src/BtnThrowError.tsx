import { Component } from 'react';

export default class SearchGroup extends Component {
  textBtn = 'Throw error';

  handleClick = () => {
    throw new Error(`Error by click button '${this.textBtn}'`);
  };

  render() {
    return (
      <div className="text-center my-3">
        <button onClick={this.handleClick} className="btn btn-danger" type="button">
          Throw error
        </button>
      </div>
    );
  }
}
