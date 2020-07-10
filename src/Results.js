import React, { Component } from 'react';

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <td key={number.toString()}>{number}</td>
  );
  return (
    <table class="table">
      <tbody>
        <tr>
        {listItems}
        </tr>
      </tbody>
    </table>
  );
}

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: 0,
      noteDuration: 0,
      startPosition: [],
      windowStartPosition: []
    };
  }

  render() {
    return (
      <div className="content">
        <h2>Results:</h2>
        <p>BPM: {this.props.bpm}</p>
        <p>note duration: {this.props.noteDuration} msec.</p>
        <h3>Positions in percentage:</h3>
        <NumberList numbers={this.props.startPosition} />
        <h3>Positions with Granular window offset:</h3>
        <NumberList numbers={this.props.windowStartPosition} />
      </div>

    );
  }

}

export default Results;