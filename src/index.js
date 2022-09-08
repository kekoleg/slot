import { reelsSetup, payLines } from './constants';

const playedLine = initPlay(reelsSetup);
getResults(playedLine);

function initPlay(reelsSetup) {
  const line = [];

  for (const reelConfig of reelsSetup) {
    const reel = generateReel(reelConfig);
    const randomReelSymbol = reel[getRandomInt(reel.length)];
    line.push(randomReelSymbol);
  }

  return line;
}

function generateReel(reelConfig) {
  let reelSymbols = [];

  for (const [symbolIndex, symbolCount] of reelConfig.entries()) {
    reelSymbols = [
      ...reelSymbols,
      ...populateSymbol({
        symbolCount,
        elementToPush: symbolIndex,
      }),
    ];
  }

  return reelSymbols;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function populateSymbol({ symbolCount, finalElementsArray = [], elementToPush }) {
  if (symbolCount > 0) {
    finalElementsArray.push(elementToPush);
    populateSymbol({ symbolCount: symbolCount - 1, finalElementsArray, elementToPush });
  }
  return finalElementsArray;
}

function checkLine({ playedLine, payLine }) {
  const difference = payLine.filter((currentSymbol, index) => playedLine[index] == currentSymbol);

  if (difference.length === payLine.length) {
    return 'WIN';
  }

  return 'LOOSE';
}

function getResults(playedLine) {
  console.log(playedLine.join(','));
  console.log('---');

  for (const currentPayLine of payLines) {
    const playResult = checkLine({ playedLine, payLine: currentPayLine });

    console.log(currentPayLine.join(','), playResult);
  }
}
