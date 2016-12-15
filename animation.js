/*
 * @file 2048you游戏的一些动画效果
 * @author:  codeFuMaster(fankof20@gmail.com)
 */

var animation = (function(){

	/*
	 * 根据传递进来的数据，做出一个动画效果
	 * param {number} i 第几行
	 * param {number} j 第几列
	 * param {number} randomNum 传入的要显示的数字
	 */
	var showNumberWithAnimation = function(i, j, randomNum) {
		var div = $("#number-cell"+'-'+ i + '-' + j)
					.css('color', judeBox.getNumberColor(randomNum))
					.css('background-color', judeBox.getNumBackgroundColor(randomNum))
					.text(randomNum);
		div.animate({
			width: "100px",
			height: "100px",
			top: judeBox.getPostTop(i, j),
			left: judeBox.getPostLeft(i, j)
		}, 50)
	}
	/*
	 *显示移动动画,避免多次重复刷新.
	 *param {number} formRow 原来的x坐标
	 *param {number} formCol 原来的y坐标
	 *param {number} toRow 要移动到的x坐标
	 *param {number} toCol 要移动到的y坐标
	 */
	var showMove = function(formRow, formCol, toRow, toCol) {
		var div = $("#number-cell"+'-'+ formRow + '-' + formCol)
					.animate({
						top: judeBox.getPostTop(toRow, toCol),
						left: judeBox.getPostLeft(toRow, toCol)
					}, 200)
	}
	return {
		showNumberWithAnimation: showNumberWithAnimation,
		showMove: showMove
	}
})()