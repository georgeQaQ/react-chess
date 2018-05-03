## simple chess game by react(Tic Tac Toe)


### 整个APP由三个组件构成 \<Game/>(整个游戏) , \<Board/>（棋盘）, \<Square>（每个小棋格）， <Game />组件控制整个游戏状态，将state自顶向下聚集传递个子组件，通过事件改变触发this.setstate()从而重新渲染整个界面。
