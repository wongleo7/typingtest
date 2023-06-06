type GameMode = 'easy' | 'medium' | 'hard' | 'extreme';
type GameDictionary = 'common' | 'withPunctuation' | 'random' | 'all';
type GameStatus = 'notStarted' | 'inProgress' | 'finished';
type GameLength = 10000 | 30000 | 60000 | 120000 | 300000 | 600000 | 900000 | 1800000 | 3600000;
type GameReport = {
	timeSpent: number;
	typedWordsPerMinute: number;
	typedCharsPerMinute: number;
	accuracy: number;
};

import randomWords from 'random-words';

export class TypingGame {
	startTime?: number;
	endTime?: number;
	gameLength: GameLength;
	gameStatus: GameStatus;
	words: string[];
	gameMode?: GameMode;
	dictionary?: GameDictionary;
	report?: GameReport;
	typedWords: string[];
	actions: number;
	totalErrors: number;
	recentErrors: number;
	currentWordIndex: number;
	currentlyTypingWord: string;
	stopGame: () => void;

	constructor(
		gameLength: GameLength,
		numWords: number,
		mode: GameMode,
		dictionary?: GameDictionary
	) {
		this.startTime = undefined;
		this.endTime = undefined;
		this.gameLength = gameLength;
		this.gameStatus = 'notStarted';
		this.words = randomWords({ exactly: numWords });
		this.gameMode = mode;
		this.dictionary = dictionary;
		this.typedWords = [];
		this.actions = 0;
		this.totalErrors = 0;
		this.recentErrors = 0;
		this.currentWordIndex = 0;
		this.currentlyTypingWord = '';
		this.stopGame = () => {
			return;
		};
	}

	startGame = () => {
		this.startTime = Date.now();

		//start timer
		const timeoutTimer = setTimeout(() => {
			this.endGame();
		}, 60000);
		clearInterval(timeoutTimer);

		return stop;

		function stop() {
			if (timeoutTimer) {
				clearTimeout(timeoutTimer);
			}
		}
	};

	endGame = () => {
		this.endTime = Date.now();
		this.report = this.generateReport();
		this.stopGame?.();
		this.gameStatus = 'finished';

		return this.report;
	};

	recordKey = (key: string) => {
		console.log(key);
		//TODO only allow letters, numbers, and certain punctuation
		this.actions++;
		if (this.gameStatus === 'notStarted') {
			this.gameStatus = 'inProgress';
			this.stopGame = this.startGame();
		}
		// console.log(this);
		console.log(key, 'Backspace', key === 'Backspace');
		if (key === 'Backspace') {
			if (this.currentlyTypingWord.length > 0) {
				this.currentlyTypingWord = this.currentlyTypingWord.slice(0, -1);
			} else if (this.recentErrors > 0) {
				this.currentWordIndex--;
				this.currentlyTypingWord = this.typedWords[this.currentWordIndex - 1];
				this.recentErrors--;
				this.totalErrors--;
			}
		} else if (key === ' ') {
			//check if current word is correct
			if (this.typedWords[this.typedWords.length - 1] === this.words[this.typedWords.length - 1]) {
				this.recentErrors = 0;
			} else {
				this.totalErrors++;
				this.recentErrors++;
			}
			this.typedWords.push(this.currentlyTypingWord);
			this.currentWordIndex++;
			this.currentlyTypingWord = '';
			if (this.currentWordIndex === this.words.length) {
				this.endGame();
			}
		} else {
			this.currentlyTypingWord += key;
		}
		return this;
	};

	generateReport = () => {
		if (this.gameStatus === 'finished' && this.endTime && this.startTime) {
			return {
				timeSpent: this.endTime - this.startTime,
				typedWordsPerMinute: this.typedWords?.length / ((this.endTime - this.startTime) / 60000),
				typedCharsPerMinute: this.actions / ((this.endTime - this.startTime) / 60000),
				accuracy: this.totalErrors / this.typedWords?.length
			};
		} else {
			return;
		}
	};
}
