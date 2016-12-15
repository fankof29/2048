
/*
 *@file 一个2048游戏
 *@author:  codeFuMaster(fankof20@gmail.com)
 */








/*
 * @class: 根据传递参数，创建一个2048游戏
 * param{string} main： 存放2048游戏的位置的id 
 * param{string} button: 点击开始游戏的按钮的id
 * param{string} score： 存放分数的位置的id
 */
function Creat2048(main, button, score) {
	this.scoreValue = 0;
	this.main = main;
	this.button = button;
	this.score = score;
	this.arr = [];//用来存储2048 4*4 个方格
	this.arrjude = [];//用来判断某个方格是否已经合并，合并后不继续合并，而是等待下一次指令
	this.init();// 初始化
	this.event();// 初始化事件
}

Creat2048.prototype =  {
	constructor: Creat2048,
	//创建基本样式
	init:function(){
		//循环创建基本的布局
		var main = $(this.main);
		//建立背景
		for(let i = 0; i < 4; i ++) {
			for(let j = 0; j < 4; j++) {
				var div = $('<div></div>')
							.attr('id','grid-cell'+'-'+ i +'-'+j)
							.addClass('grid-cell')
							.css('top', judeBox.getPostTop(i,j))
							.css('left', judeBox.getPostLeft(i,j))
							.appendTo(main);
			}
		}

		//建立数组的位置

		for(let i = 0; i < 4; i ++) {
				this.arr[i] = [];
				this.arrjude[i] = []
			for(let j = 0; j < 4; j++) {
				this.arr[i][j] = 0;
				this.arrjude[i][j] = false;
			}
		}
		//更新数据
		this.updateCell();
		//生成随机数
		this.createRandomNumCell();
		this.createRandomNumCell();
	},
	//更新数据
	updateCell: function() {
		$('.number-cell').remove();
		var main = $(this.main)
		for(let i = 0; i < 4; i ++) {
			for(let j = 0; j < 4; j++) {
				var numberCell = $("<div></div>")
									.appendTo(main)
									.attr('id', "number-cell"+'-'+ i + '-' + j)
									.addClass('number-cell');
				if(this.arr[i][j] === 0) {
					numberCell
						.css('top', judeBox.getPostTop(i, j) + 50)
						.css('left', judeBox.getPostLeft(i, j) + 50)
						.css('width', 0)
						.css('height', 0)
				} else {
					if(this.arr[i][j] >= 100) {
						numberCell
							.css('top', judeBox.getPostTop(i, j))
							.css('left', judeBox.getPostLeft(i, j))
							.css('width', 100)
							.css('height', 100)
							.css('color', judeBox.getNumberColor(this.arr[i][j]))
							.css('background-color', judeBox.getNumBackgroundColor(this.arr[i][j]))
							.css('font-size', '48px')
							.text(this.arr[i][j]);
					}else if (this.arr[i][j] >= 1000) {
						numberCell
							.css('top', judeBox.getPostTop(i, j))
							.css('left', judeBox.getPostLeft(i, j))
							.css('width', 100)
							.css('height', 100)
							.css('color', judeBox.getNumberColor(this.arr[i][j]))
							.css('background-color', judeBox.getNumBackgroundColor(this.arr[i][j]))
							.css('font-size', '48px')
							.text(this.arr[i][j]);
					} else {
						numberCell
							.css('top', judeBox.getPostTop(i, j))
							.css('left', judeBox.getPostLeft(i, j))
							.css('width', 100)
							.css('height', 100)
							.css('color', judeBox.getNumberColor(this.arr[i][j]))
							.css('background-color', judeBox.getNumBackgroundColor(this.arr[i][j]))
							.text(this.arr[i][j]);
					}
				}
				//重新把arrjude中的数据标记为可以合并
				this.arrjude[i][j] = false;
			}
		}
	},
	//随机生成一个2 或者 4
	createRandomNumCell: function(){
		var x = parseInt(Math.floor(Math.random() * 4));
		var y = parseInt(Math.floor(Math.random() * 4));

		var times = 0;
		while(times < 50) {
			if(this.arr[x][y] == 0 ) {
				break
			}
				x = parseInt(Math.floor(Math.random() * 4));
				y = parseInt(Math.floor(Math.random() * 4));
				times ++;
			
		}

		if(times == 50) {
			for(let i = 0; i < 4; i++) {
				for(let j = 0; j < 4; j++) {
					if(this.arr[i][j] == 0) {
						x = i;
						y = j;
					}
				}
			}
		}

		var num = (Math.random() > 0.5)? 2: 4;

		this.arr[x][y] = num;

		animation.showNumberWithAnimation(x, y, num);
		
	},
	//左移动
	moveLeft: function() {
		var self = this;
		if(!judeBox.canMoveLeft(this.arr)) {
			return false
		}

		//开始左移动
		for(let i = 0; i < 4; i ++) {
			for(let j = 1; j < 4; j ++ ) {
				//判断是否能够
				if(this.arr[i][j] != 0) {

					for(let k = 0; k < j; k++) {
						if(this.arr[i][k] == 0 && judeBox.canMoveLeftOrRight(i, j, k, this.arr)) {
							this.arr[i][k] = this.arr[i][j];
							this.arr[i][j] = 0;
							animation.showMove(i, j, i, k);
							continue;
						}

						else if(this.arr[i][k] == this.arr[i][j] && judeBox.canMoveLeftOrRight(i, j, k, this.arr) && !this.arrjude[i][k]) {
							this.arr[i][k] += this.arr[i][j];
							this.arr[i][j] = 0;
							//动画效果
							animation.showMove(i, j, i, k);
							//防止一次合并到底
							this.arrjude[i][k] = true;
							//更新分数
							this.scoreValue += this.arr[i][k];
							this.sumScore(this.scoreValue);
							continue
						}


					}
				}

			}
		}

		setTimeout(function(){
			self.updateCell();
		}, 200)
		return true;
	},
	//右移动
	moveRight: function() {
		var self = this;
		if(!judeBox.canMoveRight(this.arr)) {		
			return false
		}

		//开始右移动
		for(let i = 0; i < 4; i ++) {
			for(let j = 2; j >= 0; j -- ) {
				//判断是否能够
				if(this.arr[i][j] != 0) {

					for(let k = 3; k > j; k--) {

						if(this.arr[i][k] == 0 && judeBox.canMoveLeftOrRight(i, k, j, this.arr)) {
							this.arr[i][k] = this.arr[i][j];
							this.arr[i][j] = 0;
							animation.showMove(i, j, i, k);
							continue;
						}

						else if(this.arr[i][k] == this.arr[i][j] && judeBox.canMoveLeftOrRight(i, j, k, this.arr) && !this.arrjude[i][k]) {
							this.arr[i][k] += this.arr[i][j];
							this.arr[i][j] = 0;
							//动画效果
							animation.showMove(i, j, i, k);
							//防止一次合并到底
							this.arrjude[i][k] = true;
							//更新分数
							this.scoreValue += this.arr[i][k];
							this.sumScore(this.scoreValue);
							continue
						}


					}
				}

			}
		}

		setTimeout(function(){
			self.updateCell();
		}, 200)
		return true;
	},
	//向上移动
	moveUp: function() {
		var self = this;
		if(!judeBox.canMoveUp(this.arr)) {		
			return false
		}

		
		for(let j = 0; j < 4; j ++) {
			for(let i = 1; i < 4; i ++ ) {
				//判断是否能够
				if(this.arr[i][j] != 0) {

					for(let k = 0; k < i; k ++) {

						if(this.arr[k][j] == 0 && judeBox.canMoveUpOrDown(j, i, k, this.arr)) {
							this.arr[k][j] = this.arr[i][j];
							this.arr[i][j] = 0;
							animation.showMove(i, j, k, j);
							continue;
						}

						else if(this.arr[k][j] == this.arr[i][j] && judeBox.canMoveUpOrDown(j, i, k, this.arr) && !this.arrjude[k][j]) {
							this.arr[k][j] += this.arr[i][j];
							this.arr[i][j] = 0;
							//动画效果
							animation.showMove(i, j, k, j);
							//防止一次合并到底
							this.arrjude[k][j] = true;
							//更新分数
							this.scoreValue += this.arr[k][j];
							this.sumScore(this.scoreValue);
							continue
						}


					}
				}

			}
		}

		setTimeout(function(){
			self.updateCell();
		}, 200)
		return true;
	},
	//向下移动
	moveDown: function() {
		var self = this;
		if(!judeBox.canMoveDown(this.arr)) {		
			return false
		}

		
		for(let j = 0; j < 4; j ++) {
			for(let i = 2; i >= 0; i -- ) {
				//判断是否能够
				if(this.arr[i][j] != 0) {

					for(let k = 3; k > i; k --) {

						if(this.arr[k][j] == 0 && judeBox.canMoveUpOrDown(j, k, i, this.arr)) {
							this.arr[k][j] = this.arr[i][j];
							this.arr[i][j] = 0;
							animation.showMove(i, j, k, j);
							continue;
						}

						else if(this.arr[k][j] == this.arr[i][j] && judeBox.canMoveUpOrDown(j, k, i, this.arr) && !this.arrjude[k][j]) {
							this.arr[k][j] += this.arr[i][j];
							this.arr[i][j] = 0;
							//动画效果
							animation.showMove(i, j, k, j);
							//防止一次合并到底
							this.arrjude[k][j] = true;
							//更新分数
							this.scoreValue += this.arr[k][j];
							this.sumScore(this.scoreValue);
							continue
						}


					}
				}

			}
		}

		setTimeout(function(){
			self.updateCell();
		}, 200)
		return true;
	},
	event:function() {
		//监听上下左右四个方向键
		var self = this;
		$(document).on('keydown', function(e) {

			switch(e.keyCode) {
				case 37:
					if (self.moveLeft()) {
						setTimeout(function(){
							self.createRandomNumCell()
						}, 210);
					}
					self.gameover(self.arr)
					break;
				case 38:
					if(self.moveUp()) {
						setTimeout(function(){
							self.createRandomNumCell()
						}, 210);
					} 
					self.gameover(self.arr)
					break;
				case 39:
					if(self.moveRight()) {
						setTimeout(function(){
							self.createRandomNumCell()
						}, 210);
					}
					self.gameover(self.arr)
					break;
				case 40:
					if(self.moveDown()) {
						setTimeout(function(){
							self.createRandomNumCell()
						}, 210);
					}
					self.gameover(self.arr)
					break;
			}
		})

		//重新开始游戏
		$(this.button).on("click",function(){
			self.init();
		})
	},
	/*更新分数
	 *param {Number} num 传入的分数
	 */
	sumScore: function(num){
		$(this.score).text(num)
	},
	//判断首席是否结束
	gameover: function(){
		if(judeBox.nospace(this.arr)&&judeBox.nomove(this.arr)) {
			alert('游戏结束')
		}
	}
};


var new2048 = new Creat2048('#grid-container', "#newgamebutton", '#score')