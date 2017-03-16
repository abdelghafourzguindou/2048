function Game () {
	//this.SUCCES_SCORE = 2048;
	this.init = function() {
		this.width = 4;
		this.height= 4;
		this.score = 0;
		this.bord  = [];
		for(var i = 0; i < this.height; i++) {
			var temp = [];
			for(var j = 0; j < this.width; j++) {
				temp[j] = 0;
			}
			this.bord[i] = temp;
		}
		this.generate_new_number();
		this.generate_new_number();
	}

	this.generate_new_number = function() {
		var items = [];
		for(var i = 0; i < this.width; i++) {
			for(var j = 0; j < this.height; j++) {
				if(this.bord[i][j] === 0) {
					items.push([i, j]);
				}
			}
		}
		if(items.length > 0) {
			var choice_item = items[Math.floor(Math.random()*items.length)];
			var numbers_possiblty = [2, 4, 8];
			var choice_number = numbers_possiblty[Math.floor(Math.random()*numbers_possiblty.length)];
			this.bord[choice_item[0]][choice_item[1]] = choice_number;
			return choice_item;
		}
		return null;
	}

	this.get_score = function() {
		for(var i = 0; i < this.width; i++) {
			for(var j = 0; j < this.height; j++) {
				if(this.bord[i][j] > this.score) {
					this.score = this.data[i][j];
				}
			}
		}
	}

	this.show_game_infos = function() {
		for(var i = 0; i < this.width; i++) {
			for(var j = 0; j < this.height; j++) {
				process.stdout.write(this.bord[i][j] + ' ');
			}
			process.stdout.write('\n');
		}
		process.stdout.write('\n');
	}

	this.ouver = function() {
		for(var i = 0; i < this.width; i++) {
			for(var j = 0; j < this.height; j++) {
				if(this.bord[i][j] === 0) return false;
				else if(i < this.width - 1 && this.bord[i][j] === this.bord[i+1][j]) return false;
				else if(j < this.height- 1 && this.bord[i][j] === this.bord[i][j+1]) return false;
			}
		}
		return true;
	}
}

module.exports = Game;