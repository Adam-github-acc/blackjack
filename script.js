
let dealerPoints = 0;
let playerPoints = 0;
let playerAce = 0;
let dealerAce = 0;
let deck = [];
let cards;
let totalCash = 500;
let bet = 0;
let left = 100;
let left2 = 110;

const deckBuilder = () => {
    updateCash();
    resetBoard()
    deck = [];
    playerAce = 0;
    dealerAce = 0;
    left = 100;
    left2 = 110;
    let cardColour = ["heart", "spade", "diamond", "club"];
    let cardRank =
    ["A", "2", "3", "4", "5", "6", "7", "8",
     "9", "10", "J", "Q", "K"];
    for(let i = 0; i < cardRank.length; i++){
    deck.push([cardColour[0], cardRank[i]]);
    deck.push([cardColour[1], cardRank[i]]);
    deck.push([cardColour[2], cardRank[i]]);
    deck.push([cardColour[3], cardRank[i]]);
    };
};

const shuffleDeck = () => {
    for(let i = deck.length - 1; i > 0; --i) {
        const j = Math.floor(Math.random() * (i + 1));
        const k = deck[j];
        deck[j] = deck[i];
        deck[i] = k;
    };
};

const start = () =>{
    shuffleDeck();
    createOpeningTable();
    updateCash();
};
function betting(bets){
    totalCash -= bets;
    bet = bets;
};

function dealDealerCard(){
    $(".card-pile2").animate({
        "margin-right": `${left}vw`,
      },400,function(){
        $( ".card-pile2" ).animate({
            "opacity": "0"
          }, 50, function(){
            $(".card-pile2").remove();
            $(".play").append('<div class="card-pile2"></div>');
            $(".hide").removeClass('hide')
          });
      });
    left -= 11
};
function dealPlayerCard(){
    $(".card-pile").animate({
        "margin-right": `${left2}vw`,
        "margin-top": "55vh"
      },250,function(){
        $( ".card-pile" ).animate({
            "opacity": "0"
          }, 50, function(){
            $(".card-pile").remove();
            $(".play").append('<div class="card-pile"></div>');
            $(".hide").removeClass('hide')
          });
      });
    left2 -= 11
};

function resetBoard(){
    $('.player-cards').empty();
    $('.dealer-cards').empty();
    $('.player-cards').append('<div class="undone"></div>');
    $('.dealer-cards').append('<div class="undone2"></div>');
};

function playerDrawCard(){
    dealPlayerCard();
    let playerCard = deck.pop();
    $('.undone')
    .append(`<img class="big icon-${playerCard[0]}" src="./icons/${playerCard[0]}.svg">`)
    .append(`<img class="small1 icon-${playerCard[0]}" src="./icons/${playerCard[0]}.svg">`)
    .append(`<img class="small2 icon-${playerCard[0]}" src="./icons/${playerCard[0]}.svg">`)
    .append(`<div class="small2-cover"></div>`)
    .addClass(`${playerCard[0]} hide card`)
    .removeClass('undone')
    .append(`<div class="top letter-${playerCard[0]}">${playerCard[1]}</div>`)
    .append(`<div class="bot letter-${playerCard[0]}">${playerCard[1]}</div>`);
    $('.player-cards').append('<div class="undone"></div>');
    let card = playerCard.pop();
    if(card > 1)return parseInt(card);
    else if(card === "A"){
        playerAce += 1;
        return 11;
    }
    else return 10;
};
function dealerDrawCard(){
    let dealerCard = deck.pop();
    $('.undone2')
    .append(`<img class="big icon-${dealerCard[0]}" src="./icons/${dealerCard[0]}.svg">`)
    .append(`<img class="small1 icon-${dealerCard[0]}" src="./icons/${dealerCard[0]}.svg">`)
    .append(`<img class="small2 icon-${dealerCard[0]}" src="./icons/${dealerCard[0]}.svg">`)
    .append(`<div class="small2-cover"></div>`)
    .addClass(`${dealerCard[0]} hide card`)
    .removeClass('undone2')
    .append(`<div class="top letter-${dealerCard[0]}">${dealerCard[1]}</div>`)
    .append(`<div class="bot letter-${dealerCard[0]}">${dealerCard[1]}</div>`);
    $('.dealer-cards').append('<div class="undone2"></div>');
    let card2 = dealerCard.pop()
    if(card2 > 1)return parseInt(card2);
    else if(card2 === "A"){
        dealerAce += 1;
        return 11;
    }
    else return 10;
};
function dealerFirstDrawCard(){
    let card = deck.pop();
    $('.undone2')
    .append('<div class="hidden-card"></div>')
    .addClass(`${card[0]} hide card`)
    .append(`<img class="big icon-${card[0]}" src="./icons/${card[0]}.svg">`)
    .append(`<img class="small1 icon-${card[0]}" src="./icons/${card[0]}.svg">`)
    .append(`<img class="small2 icon-${card[0]}" src="./icons/${card[0]}.svg">`)
    .removeClass('undone2')
    .append(`<div class="top letter-${card[0]}">${card[1]}</div>`)
    .append(`<div class="bot letter-${card[0]}">${card[1]}</div>`);
    $('.dealer-cards').append('<div class="undone2"></div>');
    card = card.pop()
    if(card > 1)return parseInt(card);
    else if(card === "A"){
        dealerAce += 1;
        return 11;
    }
    else return 10;
};

function hit(){
    playerPoints += playerDrawCard();
    checkPlayerAce();
    $('.player-points').text(`${playerPoints}`);
    if(playerPoints > 21){
        {setTimeout(()=>{
            $('.btn-hit').prop('disabled', true).addClass('hover');
            $('.btn-stand').prop('disabled', true).addClass('hover');
        }, 301)};
        {setTimeout(()=>{
            $('.dealer-points').text(`${dealerPoints}`);
            $('.hidden-card').removeClass('hidden-card');
            $('.hidden-card').addClass('card');
        }, 1000)};
        {setTimeout(()=>{
            gameDone();
        }, 2000)};
    };
};

function stand(){
    $('.btn-hit').prop('disabled', true).removeClass('hover');
    $('.btn-stand').prop('disabled', true).removeClass('hover');
    $('.hidden-card').removeClass('hidden-card');
    drawAgain();
    $('.dealer-points').text(`${dealerPoints}`);
    {setTimeout(()=>gameDone(), 3001)};
}

function drawAgain(){
    $('.dealer-points').text(`${dealerPoints}`);
    checkDealerAce();
    if(dealerPoints < 17) {
        {setTimeout(()=>{
            dealDealerCard()
            dealerPoints += dealerDrawCard();
            drawAgain();
        }, 500)};
    };
    $('.dealer-points').text(`${dealerPoints}`);
};

function checkDealerAce(){
    if(dealerPoints > 21 && dealerAce > 0){
        dealerPoints -= 10;
        dealerAce -= 1;
    };
};
function checkPlayerAce(){
    if(playerPoints > 21 && playerAce > 0){
        playerPoints -= 10;
        playerAce -= 1;
    };
};
function createOpeningTable(){
    dealDealerCard()
    updateCash();
    dealerPoints += dealerFirstDrawCard();
    playerPoints += playerDrawCard();
    let openingPoints = dealerDrawCard();
    dealerPoints += openingPoints;
    playerPoints += playerDrawCard();
    checkDealerAce();
    checkPlayerAce();
    $('.player-points').text(`${playerPoints}`);
    $('.dealer-points').text(`${openingPoints}`);
};

function checkWin(){
    $('.btn-hit').prop('disabled', true).removeClass('hover');
    $('.btn-stand').prop('disabled', true).removeClass('hover');
    if(dealerPoints > 21) {
        totalCash += bet * 2;
        disableButton();
        updateCash();
        bet = 0;
        {setTimeout(() =>{
            dealerPoints = 0;
            playerPoints = 0;
            $('.dealer-points').text(`${dealerPoints}`);
            $('.player-points').text(`${playerPoints}`);
        }, 3300)};
        {setTimeout(() =>{
            $('.winning-message').remove();
        }, 3300)};
        $('.winning-message').addClass('show');
        $('.put-bet').addClass('show');
        $('.end-text').text('YOU WIN');
        endMessageAnimation();
    }

    else if(playerPoints > 21 || dealerPoints >= playerPoints) {
        {setTimeout(() =>{
            dealerPoints = 0;
            playerPoints = 0;
            bet = 0;
            $('.dealer-points').text(`${dealerPoints}`);
            $('.player-points').text(`${playerPoints}`);
        }, 3300)};
        {setTimeout(() =>{
            $('.winning-message').remove();
        }, 3300)};
        updateCash();
        $('.winning-message').addClass('show');
        $('.put-bet').addClass('show');
        $('.end-text').text('DEALER WINS');
        $( ".end-text" ).animate({"opacity": "0"}, 3300);
    }
    else if(dealerPoints < playerPoints){
        totalCash += bet * 2;
        disableButton();
        updateCash();
        bet = 0;
        {setTimeout(() =>{
            dealerPoints = 0;
            playerPoints = 0;
            $('.dealer-points').text(`${dealerPoints}`);
            $('.player-points').text(`${playerPoints}`);
        }, 3300)};
        {setTimeout(() =>{
            $('.winning-message').remove();
        }, 3300)};
        $('.winning-message').addClass('show');
        $('.put-bet').addClass('show');
        $('.end-text').text('YOU WIN');
        endMessageAnimation();
    };
};

function endMessageAnimation(){
    $( ".end-text" ).animate({"opacity": "0.25"}, 300);
    $( ".end-text" ).animate({"opacity": "1"}, 300);
    $( ".end-text" ).animate({"opacity": "0.25"}, 300);
    $( ".end-text" ).animate({"opacity": "1"}, 300);
    $( ".end-text" ).animate({"opacity": "0.25"}, 300);
    $( ".end-text" ).animate({"opacity": "1"}, 300);
    $( ".end-text" ).animate({"opacity": "0.25"}, 300);
    $( ".end-text" ).animate({"opacity": "1"}, 300);
    $( ".end-text" ).animate({"opacity": "0"}, 900);
};

function gameDone(){
    {setTimeout(() =>{
        checkWin();
    }, 500)};
        if(totalCash === 0){
            $('.restart-game').addClass('show');
            $('.play').removeClass('show');
            $('.btn-start-over').prop('disabled', true).removeClass('hover');
            {setTimeout(()=>{
                $('.btn-start-over').prop('disabled', false).addClass('hover');
            }, 4000)}
        }
        else
        disableButton();
        deckBuilder();
        $('.play').addClass('show');
};

function disableButton(){
    $('.btn-hit').prop('disabled', true).removeClass('hover');
    $('.btn-stand').prop('disabled', true).removeClass('hover');
    if(totalCash >=200)$('.btn-200').prop('disabled', false).addClass('hover');
    if(totalCash >=100)$('.btn-100').prop('disabled', false).addClass('hover');
    if(totalCash >=50)$('.btn-50').prop('disabled', false).addClass('hover');
};

function enableButton(){
    $(document).ready(function(){
        $('.btn-hit').prop('disabled', false).addClass('hover');
        $('.btn-stand').prop('disabled', false).addClass('hover');
        $('.put-bet').removeClass('show');
        $('.btn-200').prop('disabled', true).removeClass('hover');
        $('.btn-100').prop('disabled', true).removeClass('hover');
        $('.btn-50').prop('disabled', true).removeClass('hover');
        $('.play').append('<div class="winning-message"><div class="end-text"></div></div>');
    });
};

$(document).ready(function(){
    $(".btn-start").click(function(){
        $('.play-again').removeClass('show');
        disableButton();
        $('.put-bet').addClass('show');
        deckBuilder();
        $('.play').addClass('show');
    });
});

$(document).ready(function(){
    $(".btn-start-over").click(function(){
        deckBuilder();
        $('.dealer-points').text(`${dealerPoints}`);
        $('.player-points').text(`${playerPoints}`);
        $('.winning-message').remove();
        totalCash = 500;
        updateCash();
        disableButton();
        $('.play').addClass('show');
        $('.restart-game').removeClass('show');
        $('.btn-start-over').removeClass('show');
    });
});

$(document).ready(function(){
    $('.btn-hit').click(function(){
        $('.btn-hit').prop('disabled', true).removeClass('hover');
        $('.btn-stand').prop('disabled', true).removeClass('hover');
        {setTimeout(()=>{
            $('.btn-hit').prop('disabled', false).addClass('hover');
            $('.btn-stand').prop('disabled', false).addClass('hover');
        }, 300)};
        hit();
    });
});

$(document).ready(function(){
    $(".btn-stand").click(function(){
        stand();
    });
});
function updateCash(){
    $('.total-cash').text(`${totalCash}`);
};

$(document).ready(function(){
    $(".btn-50").click(function(){
        betting(50);
        start();
        enableButton();
    });
});

$(document).ready(function(){
    $(".btn-100").click(function(){
        betting(100);
        start();
        enableButton();
    });
});

$(document).ready(function(){
    $(".btn-200").click(function(){
        betting(200);
        start();
        enableButton();
    });
});
