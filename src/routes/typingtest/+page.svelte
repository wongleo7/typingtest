<script lang="ts">
	import { TypingGame } from './typing-game';

    let pressedKey = '';
    let wordsToPlay = [];
    let game = new TypingGame(
        10000,
        200,
        'easy',
        'common'
    );
    $: typing = game.currentlyTypingWord;
    $: status = game.gameStatus;
    $: currentWord = game.currentWordIndex;
    $: words = game.words;
    $: startTime = game.startTime;
    $: endTime = game.endTime;
    
	const keydown = (event: KeyboardEvent) => {
        game.recordKey(event.key);
        game = game;
        console.log(game);
        pressedKey = event.key;
	}
    const startNewGame = () => {
        //game should have word settings, like word dictionary, play style, etc.
        game = new TypingGame(
            10000,
            200,
            'easy',
            'common'
        );
        wordsToPlay = game.words;
        // game should return a list of words (200 words?)
        //and the game should remember the start time. 
        // When we are done, we should see states like:
        // words per minute, error rate, characters per minute

    }
</script>

<svelte:window on:keydown={keydown} />

<svelte:head>
	<title>Typing Test in Svelte</title>
	<meta name="description" content="A Typing Test written in SvelteKit" />
</svelte:head>

<div>
    <p>Game Status: {game.gameStatus}</p>
    <p>Words: {game.words}</p>
    <p>current word: {game.words[game.currentWordIndex]}</p>
    <p>Currently Typing word: {game.currentlyTypingWord}</p>
    <p></p>
    <br />
    <br />
    <br />
    <p>Time Remaining: {game?.startTime && game?.startTime + game.gameLength - Date.now()}</p>
    <p>Words Per Minute: {game.report?.typedWordsPerMinute}</p>
    <p>Characters Per Minute: {game.report?.typedCharsPerMinute}</p>
    <p>Errors: {game.totalErrors}</p>

</div>