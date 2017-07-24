const commando = require("discord.js-commando")

class  Grid extends commando.Command {

    constructor(client){
        super(client, {
            name: "grid",
            group: "stuff",
            memberName: "grid",
            description: "Makes a grid out of a given word",
            args: [
                {
                    key: "word",
                    prompt: "word to be used?",
                    type: "string"
                },
                {
                    key: "height",
                    prompt: "What height?",
                    type: "string"
                },
                {
                    key: "width",
                    prompt: "What width?",
                    type: "string"
                }
            ]
        });
    }

    run(message,args){
		var width = args["width"];
		var height = args["height"];
		var word = args["word"];
		var letter = word.split("");
		var linesDown = ((word.length-1)*height)+1;
		var linesAccross = ((word.length-1)*width)+1;
		var line = [];
		var rline = [];
		
		

		var count = 0;
		var up = true;
		var highest;
		if(linesAccross>=linesDown){
			highest = linesAccross;
		}else{
			highest = linesDown;
		}
		
		if(count==0||count==letter.length-1){
			for(var x=0;x<highest;x++){
				rline[x] = letter.reverse()[count];
				line[x] = letter.reverse()[count];
				if(count==letter.length-1){
					up = false;
					count--;
				}else if(count==0){
					up = true;
					count++;
				}else if(up){
					count++;
				}else{
					count--;
				}
			}
		}
		
		
		var complete = [];
		for(var y=0;y<linesDown;y++){
			complete[y] = [];
			for(var x=0;x<linesAccross;x++){
				complete[y][x] = " ";
			}
		}
		
		
		for(var y=letter.length-1;y<complete.length;y+=(letter.length-1)*2){
			for(var x=0;x<complete[y].length;x++){
				complete[y][x] = line[x];
			}
		}
		for(var y=0;y<complete.length;y+=(letter.length-1)*2){
			for(var x=0;x<complete[y].length;x++){
				complete[y][x] = rline[x];
			}
		}

		for(var x=letter.length-1;x<complete[0].length;x+=(letter.length-1)*2){
			for(var y=0;y<complete.length;y++){
				complete[y][x] = line[y];
			}
		}
		for(var x=0;x<complete[0].length;x+=(letter.length-1)*2){
			for(var y=0;y<complete.length;y++){
				complete[y][x] = rline[y];
			}
		}
		

		var string = ""
		for(var y=0;y<linesDown;y++){
			for(var x=0;x<linesAccross;x++){
				string += complete[y][x] + " ";
			}
			string += "\n";
		}

        message.reply("```"+ string+"```");
		message.delete();
    }

}

module.exports = Grid;