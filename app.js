var main = function()
{
	"use strict";

	var ranks = ["two","three","four","five","six","seven","eight","nine","ten","jack", "queen", "king","ace"];
	var suits = ["spades","clubs","diamonds","hearts"];
	var cards=[], rankUniqueArr=[], hand = "", highestNotAce=0, lowest=0, firstSuit;
	var isFlush=true, rankOccurences={};
	cards = (function()
				{
					var i=0, rankIndex,suitIndex, cards=[];
					while(i<5)
					{
						rankIndex = Math.floor(Math.random() * ranks.length);
						suitIndex = Math.floor(Math.random() * suits.length);
						var duplicate=
							cards.some(function(card){
							return (card.rank == ranks[rankIndex] &&
							   card.suit == suits[suitIndex] );
						});
						if(!duplicate)
						{
						cards.push({'rank':ranks[rankIndex],'suit':suits[suitIndex]});
						i++;
						}
					}
					return cards;
				})();
	console.log(JSON.stringify(cards));	
		
	cards.forEach(function(card,index){
		var curRank = ranks.indexOf(card.rank);
		if( 0 > rankUniqueArr.indexOf(curRank))
		{
			rankUniqueArr.push(curRank);
			rankOccurences[curRank] = 0;
		}
		rankOccurences[curRank]++;
		if( 0 == index)
		{
			firstSuit = card.suit;
			lowest    = curRank;	
		}
		if(card.suit !== firstSuit) isFlush = false;
		if(curRank > highestNotAce && curRank < (ranks.length-1)) highestNotAce = curRank;
		if(curRank < lowest) lowest = curRank;
	});

	switch( rankUniqueArr.length )
	{
	case 5:
		if(5 > (highestNotAce - lowest) )
		{
			if( -1 < rankUniqueArr.indexOf(ranks.length-1) && highestNotAce === ranks.length-2 && isFlush)
				hand = "royal";
			else hand = "straight";	 
		}
		if(!isFlush) hand = "bust"; 
		break;
	case 4:
		hand = "pair";
		break;
	case 3:
	case 2:
		var maxOccurence=0;
		for(var i in rankOccurences){
			if(maxOccurence < rankOccurences[i]) maxOccurence = rankOccurences[i];
		}
		switch(maxOccurence)
		{
			case 2: hand = "Two pair"; break;
			case 3: hand = ( 2 == rankUniqueArr.length) ? "Full house" : "Three of a kind"; break;
			case 4: hand = "Four of a kind"; break;
		}
		break;
	}
	if(isFlush) hand = hand ? hand + " flush" : "flush";
	console.log(hand);
}
$(document).ready(main);