'use strict';

var electron 	= require('electron');
var ipcRenderer = electron.ipcRenderer;
var conf 		= require('./js/conf');
var cell_color	= conf.read_conf('cell_color');
var Game 		= require('./js/game');
var game 		= new Game();
var cells 		= document.querySelectorAll('td');
var score 		= document.querySelectorAll('.score');

game.init();
game.show_game_infos();
update_cell_contents();

var best_score = localStorage.getItem('best_score');
if(best_score === null) best_score = 0;
score.textContent = best_score;

function save_best_score(score) {
	if(score > best_score) {
		best_score = score;
		localStorage.setItem('best_score', best_score);
		best_score_item.textContent = best_score;
	}
}

function Reset() {
	game.init();
	update_cell_contents();
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
	score.textContent = game.score;
	if(game.ouver()) {
		save_best_score(game.score);
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