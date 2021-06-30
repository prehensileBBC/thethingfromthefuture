let cardData = {};

function init() {
	
	initUI();

    initData( function( data ){
		onCardDataLoaded( data );
	});

};

function initData( callback ){
	fetch('cards.json')
  	.then(response => response.json())
  	.then(data => {
  		callback( data );
  	});
}

function initUI(){

	// set up individual shuffle buttons
	for( const btnElement of document.getElementsByClassName("btn") ) {
		if( btnElement.id == "btn-shuffle" ){
			btnElement.onclick = function(){
				randomiseCards();
			}
		} else {
			btnElement.onclick = function(){
				onButtonPressed( btnElement.dataset.card );
			}
		}
	}
}

function onButtonPressed( cardId ){
	randomiseCard( cardId );
}

function onCardDataLoaded( data ){
	cardData = data;
	randomiseCards();
}

function randomiseCard( cardName ){
	const classData = cardData[ cardName ];
	const classDatum = classData[ Math.floor(Math.random()*classData.length) ]
	const divId = `card-${cardName}`;
	const divCard = document.getElementById( divId );
	const divTitle = divCard.getElementsByClassName( "card-title" )[0];
	
	if( cardName == "arc" ){
		const divSubtitle = divCard.getElementsByClassName( "card-subtitle" )[0];
		divTitle.innerHTML = classDatum[0];
		divSubtitle.innerHTML = classDatum[1];
	} else {
		divTitle.innerHTML = classDatum;
	}
}

function randomiseCards(){

	const cardNames = [ "arc", "terrain", "object", "mood" ];

	for( let cardName of cardNames ){
		randomiseCard( cardName );
	}
}

init();