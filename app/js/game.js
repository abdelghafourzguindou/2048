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
					this.score = this.bord[i][j];
				}
			}
		}
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

	this.left=function(){
        
        for(var raw=0;raw<this.height;raw++){
            var col=0;
            var k=0;
            var flag=false;
            while(col<this.width){
                if(this.bord[raw][col]!=0){
                    if(k>0 && this.bord[raw][col]===this.bord[raw][k-1] && flag===false){
                        this.bord[raw][k-1]=this.bord[raw][col]*2;
                        flag=true;
                    }
                    else{
                        this.bord[raw][k]=this.bord[raw][col];
                        k=k+1;
                    }
                }
                col=col+1;
            }
            for (var l=k;l<this.width;l++){
                this.bord[raw][l]=0;
            }
        }
    }
    
    this.right=function(){
        for(var raw=0;raw<this.height;raw++){
            var col=this.width-1;
            var k=this.width-1;
            var flag=false;
            while(col>-1){
                if(this.bord[raw][col]!=0){
                    if(k<this.width-1 && this.bord[raw][col]===this.bord[raw][k+1] && flag===false){
                        this.bord[raw][k+1]=this.bord[raw][col]*2;
                        flag=true;
                    }
                    else{
                        this.bord[raw][k]=this.bord[raw][col];
                        k=k-1;
                    }
                }
                col=col-1;
            }
            for (var l=0;l<k+1;l++){
                this.bord[raw][l]=0;
            }
        }
    } 
      
    this.up=function(){
        for(var col=0;col<this.width;col++){
            var raw=0;
            var k=0;
            var flag=false;
            while(raw<this.height){
                if(this.bord[raw][col]!=0){
                    if(k>0 && this.bord[raw][col]===this.bord[k-1][col] && flag===false){
                        this.bord[k-1][col]=this.bord[raw][col]*2;
                        flag=true;
                    }
                    else{
                        this.bord[k][col]=this.bord[raw][col];
                        k=k+1;
                    }
                }
                raw=raw+1;
            }
            for (var l=k;l<this.height;l++){
                this.bord[l][col]=0;
            }
        }
    } 
    
    this.down=function(){
        for(var col=0;col<this.width;col++){
            var raw=this.height-1;
            var k=this.height-1;
            var flag=false;
            while(raw>-1){
                if(this.bord[raw][col]!=0){
                    if(k<this.height-1 && this.bord[raw][col]===this.bord[k+1][col] && flag===false){
                        this.bord[k+1][col]=this.bord[raw][col]*2;
                        flag=true;
                    }
                    else{
                        this.bord[k][col]=this.bord[raw][col];
                        k=k-1;
                    }
                }
                raw=raw-1;
            }

            for (var l=0;l<k+1;l++){
                this.bord[l][col]=0;
            }
        }
    } 
}

module.exports = Game;