import React, { Component } from 'react';

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <td key={number.toString()}>{number}</td>
  );
  return (
    <table className="table">
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
      <div className="box content">
        <p>BPM: {this.props.bpm}</p>
        <p>Note duration / Window length: {this.props.noteDuration} msec.</p>
        <p>Middle position in percentage:</p>
        <NumberList numbers={this.props.startPosition} />
        <p>Start position with Granular window offset:</p>
        <NumberList numbers={this.props.windowStartPosition} />
      </div>
    );
  }

}

export default Results;