/*
 *@file 用来判断状态的模块
 *@author codeFuMaster(fankof20@gmail.com)
 */

 var judeBox = (function(){
 	/*
 	 * param {number} i 4*4方格中的第几行
 	 * param {number} j 4*4方格的第几列
 	 * return {number} top的坐标
 	 */
 	var getPostTop = function(i, j) {
 		return 20 + i*120;
 	};
 	/*
 	 * param {number} i 4*4方格中的第几行
 	 * param {number} j 4*4方格的第几列
 	 * return left的坐标
 	 */
 	var getPostLeft = function(i, j) {
 		return 20 + j*120;
 	};
 	/*
 	 * param {number} num 每一个方格中的数字
 	 * return 根据数字大小返回颜色值
 	 */
 	var getNumberColor = function(num) {
 		if(num <= 4) {
 			return "#776e65";
 		} else {
 			return "#fff";
 		}
 	};
 	/* 根据数字返回背景颜色
 	 * param {number} num  根据传递捡来方块的数字
 	 * return 返回颜色 
 	 */
 	var getNumBackgroundColor = function(num) {
 		switch( num ){
 		    case 2:
 		    	return "#eee4da";
 		    	break;
 		    case 4:
 		    	return "#ede0c8";
 		    	break;
 		    case 8:
 		    	return "#f2b179";
 		    	break;
 		    case 16:
 		    	return "#f59563";
 		    	break;
 		    case 32:
 		    	return "#f67c5f";
 		    	break;
 		    case 64:
 		    	return "#f65e3b";
 		    	break;
 		    case 128:
 		    	return "#edcf72";
 		    	break;
 		    case 256:
 		    	return "#edcc61";
 		    	break;
 		    case 512:
 		    	return "#9c0";
 		    	break;
 		    case 1024:
 		    	return "#33b5e5";
 		    	break;
 		    case 2048:
 		    	return "#09c";
 		    	break;
 		    case 4096:
 		    	return "#a6c";
 		    	break;
 		    case 8192:
 		    	return "#93c";
 		    	break;
 		}

 		return "black";
 	};
 	

 	/*
 	 *判断水平移动之间是否有障碍
 	 *param {Number} row 游戏中数组(存储数字)的 纵轴坐标
 	 *param {Number} col1 水平移动的初始位置
 	 *param {Number} col2 水平移动的重点位置
 	 *param {Array} arr 存储数字的数组
 	 *return {Boolean} 能移动返回ture 不能移动返回false
 	 */
 	var canMoveLeftOrRight = function(row, clo1, clo2, arr) {
 		for(let i = clo2 +1; i < clo1; i++ ) {
 			if(arr[row][i] != 0) {
 				return false;
 			}
 		}

 		return true;
 	}
 	/*
 	 *判断垂直移动之间能否有障碍
 	 *param {Number} col 游戏中数组(存储数字)的 横轴坐标
 	 *param {Number} row1 垂直移动的初始位置
 	 *param {Number} row2 垂直移动的终点位置
 	 *param {Array} arr 存储数字的数组
 	 *return {Boolean} 能移动返回ture 不能移动返回false
 	 */
 	var canMoveUpOrDown = function(col, row1, row2, arr) {
 		for(let i = row2 +1; i < row1; i++ ) {
 			if(arr[i][col] != 0) {
 				return false;
 			}
 		}

 		return true;
 	}
 	/*
 	 * 判断能否左移动
 	 * return {Boolean} 能移动返回true 不能移动返回 false
 	 */
 	var canMoveLeft = function(arr){

 		for(let i = 0; i < 4; i++) {
 			for(let j = 1; j < 4; j ++) {
 				if( arr[i][j] != 0) {
 					if(arr[i][j] == arr[i][j - 1] || arr[i][j - 1] == 0) {
 						return true;
 					}
 				}
 			}
 		}

 		return false;
 	};
 	/*
 	 * 判断能右移动
 	 * param {Array} arr 用来移动的数组
 	 * return {Boolean} 如果为ture 表示能移动, 为false表示不能移动
 	 */
 	var canMoveRight = function(arr) {
 		for(let i = 0; i < 4; i++) {
 			for(let j = 2; j >= 0; j --) {
 				if( arr[i][j] != 0) {
 					if(arr[i][j] == arr[i][j + 1] || arr[i][j + 1] == 0) {
 						return true;
 					}
 				}
 			}
 		}

 		return false;
 	};
 	/*
 	 * 判断能否上移动
 	 * param {Array} arr 用来移动的数组
 	 * return {Boolean} 如果为ture 表示能移动, 为false表示不能移动
 	 */
 	var canMoveUp = function(arr) {
 		for(let j = 0; j < 4; j++) {
 			for(let i = 1; i < 4; i ++) {
 				if( arr[i][j] != 0) {
 					if(arr[i - 1][j] == arr[i][j] || arr[i - 1][j] == 0) {
 						return true;
 					}
 				}
 			}
 		}

 		return false;
 	};
 	/*
 	 * 判断能否下移动
 	 * param {Array} arr 用来移动的数组
 	 * return {Boolean} 如果为ture 表示能移动, 为false表示不能移动
 	 */
 	var canMoveDown = function(arr) {
 		for(let j = 0; j < 4; j++) {
 			for(let i = 2; i >= 0; i --) {
 				if( arr[i][j] != 0) {
 					if(arr[i + 1][j] == arr[i][j] || arr[i + 1][j] == 0) {
 						return true;
 					}
 				}
 			}
 		}

 		return false;
 	};
 	/*判断是否不能移动
 	 *param {Array} arr 判断的数组
 	 *return {Boolean} 如果为true 不能移动,如果为false能够移动
 	 */
 	var nomove = function(arr) {
 		if(judeBox.canMoveUp(arr) || judeBox.canMoveRight(arr) || judeBox.canMoveLeft(arr) || judeBox.canMoveUpOrDown(arr)) {
 			return true;
 		}

 		return false;
 	}
 	/*判断是否没有空间
 	 *param {Array} arr 判断的数组
 	 *return {Boolean} 如果为true 表示没有空间 如果为false 表示还有空间
 	 */
 	var nospace = function(arr) {
 		for(let i = 0; i < 4; i++) {
 			for(let j = 0; j < 4; j++) {
 				if(arr[i][j] == 0) {
 					return false
 				}
 			}
 		}

 		return true;
 	}
 	return {
 		getPostTop: getPostTop,
 		getPostLeft: getPostLeft,
 		getNumberColor: getNumberColor,
 		getNumBackgroundColor: getNumBackgroundColor,
 		canMoveLeft: canMoveLeft,
 		canMoveLeftOrRight: canMoveLeftOrRight,
 		canMoveRight: canMoveRight,
 		canMoveUp: canMoveUp,
 		canMoveUpOrDown: canMoveUpOrDown,
 		canMoveDown: canMoveDown,
 		nomove: nomove,
 		nospace: nospace
 	}
 })();