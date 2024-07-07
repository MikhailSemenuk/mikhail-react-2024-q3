import { Component } from 'react';

interface BtnThrowErrorState {
  isRenderError: boolean;
}

export default class BtnThrowError extends Component<object, BtnThrowErrorState> {
  textBtn = 'Throw error';

  constructor(props: object) {
    super(props);
    this.state = {
      isRenderError: false,
    };
  }

  handleClick = () => {
    this.setState({ isRenderError: true });
  };

  render() {
    if (this.state.isRenderError) {
      throw new Error(this.textBtn);
    }

    return (
      <div className="text-center my-3">
        <button onClick={this.handleClick} className="btn btn-danger" type="button">
          Throw error
        </button>
      </div>
    );
  }
}
