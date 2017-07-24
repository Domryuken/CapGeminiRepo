const stuff = require('../../JavaScriptBotStuff.js');
const commando = require("discord.js-commando");
const https = require("https");
const request = require("request");
const idurl = "https://euw.api.riotgames.com/api/lol/EUW/v1.4/summoner/by-name/";
const rankurl = "https://euw1.api.riotgames.com/lol/league/v3/positions/by-summoner/";

const LeagueofLegends = require('leagueoflegends-api');
const lol = new LeagueofLegends(stuff.riot, 'euw');

class Lol extends commando.Command {

    constructor(client) {
        super(client, {
            name: "lolranks",
            group: "stuff",
            memberName: "lolranks",
            description: "league of legends"
        });
    }

    run(message,args) {
        
        message.delete();
        message.reply("");
        let search = args.toString().split(" - ");

        let getId = function (callback, summoner) {
            let url = idurl + summoner.toLowerCase() + stuff.riot;
            request(url, function (error, response, body) {
                if(JSON.parse(body)[summoner.toLowerCase()]){
                    var id = JSON.parse(body)[summoner.toLowerCase()]["id"];
                    callback(id,summoner);
                }else{message.channel.send("Whaa...?")}
            });
        }

        let getRank = function (id,summoner) {
            let url = rankurl + id + stuff.riot;
            let string = "\n\n***"+summoner + "***";
            request(url, function (error, response, body) {
                var rank = JSON.parse(body);
                for (let i = 0; i < rank.length; i++) {
                    string += "\n" + rank[i]["queueType"] + ": " + rank[i]["tier"] + " " + rank[i]["rank"];
                    if(rank[i]["veteran"])string += " (Hard Stuck)";
                }
                message.channel.send(string);
            });
        }

        for(let i=0;i<search.length;i++){
            getId(getRank, search[i]);
        }
    }

}
module.exports = Lol;