//parametros da bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 22;
let  raioBolinha  =  diametro  /  2;
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;

//paramentos para a criação da minha Raquete
let xRaquete = 2;
let yRaquete = 50;
let comRaquete = 10;
let altRaquete = 90;

//sulução de Reuso (de outra pessoa) para raquete do oponente
let colidiu = false;
let xRaqueteOponente = 588;
let yRaqueteOponente = 50;
let comRaqueteOponente = 10;
let altRaqueteOponente = 90;
let velocidadeYOponente = velocidadeyBolinha;
let chanceDeErrar;

//parametros para o placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let trilha;
let ponto;

function preload(){
  trila = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete();
  movimentaRaquete();
  verificaColisaoRaquete();
  mostraRaqueteOponente();
  //movimentaRaqueteOponenteAutomatico();
  movimentaRaqueteOponenteAdversario();
  verificacolisaoRaqueteOponente();
  calculaChanceDeErrar()
  incluirPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa()
}   

function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro)
}

function movimentaBolinha (){
   xBolinha += velocidadexBolinha;
   yBolinha += velocidadeyBolinha;
}

function verificaColisaoBorda (){
   if (xBolinha + raioBolinha > width || xBolinha - raioBolinha < 0) {
    velocidadexBolinha *=-1;
  }
  if (yBolinha + raioBolinha > height || yBolinha - raioBolinha < 0) {
    velocidadeyBolinha *=-1;
  }
}

function mostraRaquete (){
  rect(xRaquete, yRaquete, comRaquete, altRaquete)
}

function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete (){
   if (xBolinha - raioBolinha < xRaquete + comRaquete && yBolinha - raioBolinha < yRaquete + altRaquete && yBolinha + raioBolinha  > yRaquete) {
    velocidadexBolinha *=-1;
     raquetada.play;
  }
}

function mostraRaqueteOponente (){
  rect(xRaqueteOponente, yRaqueteOponente, comRaqueteOponente, altRaqueteOponente)
}

//jogar contra sistema
function movimentaRaqueteOponenteAutomatico(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - comRaqueteOponente / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
  
}

//para jogar com outra pessoa fisica
function movimentaRaqueteOponenteAdversario(){
  if (keyIsDown(87)){
    yRaqueteOponente -= 11;
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 11;
  }
}

function verificacolisaoRaqueteOponente(x,y){
  colidiu = collideRectCircle(x, y,comRaqueteOponente,altRaqueteOponente, xBolinha, yBolinha, raioBolinha)
  if (colidiu){
    velocidadexBolinha *=-1;
    raquetada.play;
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 50
    }
  }
}

function incluiPlacar(){
//cor, tamanho e posição do placar
  stroke(255);
  textAlign(CENTER);
  textSize(16);
//cor, tamanho e posição da tabela 01
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
//cor, tamanho e posição da tabela 02
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

 
function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();

  }
  if (xBolinha < 11) {
    pontosDoOponente += 1
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raioBolinha < 0){
    console.log('bolinha ficou presa');
    xBolinha = 300;
    }
}
