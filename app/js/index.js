'use strict';

var electron 	= require('electron');
var ipcRenderer = electron.ipcRenderer;
var conf 		= require('./js/conf');
var cell_color	= conf.read_conf('cell_color');
var Game 		= require('./js/game');
var game 		= new Game();
var cells 		= document.querySelectorAll('td');
var GameScore   = document.getElementById('score');
var HightScore  = document.getElementById('Hscore');

game.init();
update_cell_contents();

var hight_score = localStorage.getItem('hight_score');
if(hight_score === null) hight_score = 0;
HightScore.textContent = hight_score;

function save_hight_score(score) {
	if(game.score > hight_score) {
		hight_score = game.score;
		localStorage.setItem('hight_score', hight_score);
		HightScore.textContent = hight_score;
	}
}

function Reset() {
	game.init();
	update_cell_contents();
	GameScore.textContent = 0;
}

function update_cell_contents() {
	for(var i = 0; i < game.width; i++) {
		for(var j = 0; j < game.height; j++) {
			var cell = cells[i*game.width+j];
			cell.textContent = game.bord[i][j];
			if(typeof cell_color[game.bord[i][j]] === 'undefined') {
				cell.style['background-color'] = cell_color["default"]['background'];
				cell.style['color'] = cell_color["default"]['color'];
			} else {
				cell.style['background-color'] = cell_color[game.bord[i][j]]['background'];
				cell.style['color'] = cell_color[game.bord[i][j]]['color'];
			}
		}
	}
}

function update_view () {
	update_cell_contents();
	game.get_score();
	GameScore.textContent = game.score;
	if(game.ouver()) {
		save_hight_score(game.score);
	}
	game.generate_new_number();
}

ipcRenderer.on('up', function() {
	game.up();
	update_view();
});

ipcRenderer.on('down', function() {
	game.down();
	update_view();
});

ipcRenderer.on('left', function() {
	game.left();
	update_view();
});

ipcRenderer.on('right', function() {
	game.right();
	update_view();
});