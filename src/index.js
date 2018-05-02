import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'

//方格
class Square extends React.Component {

    render() {
        return (
        <button className="square" onClick = {this.props.onClick}>
        {this.props.value}
        </button>
        )
    }
}

//棋盘
class Board extends React.Component {

    // handleClick(i) {
    //     const squares = this.state.squares.slice()//复制当前数组  ***不可变数据重要性
    //     if (calculateWinner(squares) || squares[i]) { //出现winner或空格已被填充 handleClick无效
    //         return
    //     }
    //     squares[i] = this.state.xIsNext ? 'X' : 'O';
    //     this.setState({
    //         squares: squares,
    //         xIsNext: !this.state.xIsNext
    //     })
    // }

    renderSquare(i) {
        return <Square value = {this.props.squares[i]} onClick={()=>this.props.onClick(i)} />
    }

    render() {
        return (
            <div>
                <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                </div>
                <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                </div>
                <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}



//整个游戏
class Game extends React.Component {
    constructor() {
        super()
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0,this.state.stepNumber+1)//悔棋后改变history数组长度
        const current = history[history.length-1]
        const squares = current.squares.slice() //不可变数据重要性
        if(calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X':'O'
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true
        })
    }

    render() {
        const history = this.state.history.slice(0,this.state.stepNumber+1)
        const current = history[this.state.stepNumber] //初始history[0].squares
        const winner = calculateWinner(current.squares)

        let status
        if(winner) {
            status = 'Winner: ' + winner
        }else{
            status = 'Next palyer: ' +(this.state.xIsNext? 'X':'O')
        }
        
        //右侧步骤显示
        const moves = history.map((step,move)=>{
            const desc = move ? 
            'Move #' + move :
            'Game start'
            return (
                <li key={move}>
                    <a href="#" onClick={()=>{
                        this.jumpTo(move)
                    }}>{desc}</a>
                </li>
            )
        })


        return (
            <div className="Game">
            <div className="game-board">
            <Board squares={current.squares} onClick = {(i)=>{this.handleClick(i)}} />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            </div>
            </div>
        )
    }
}

//判断获胜者
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]; //解构赋值
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)