<script lang="ts">
	import { TypingGame } from './typing-game';

    let pressedKey = '';
    let currentWord = '';
    let game = new TypingGame(
        10000,
        200,
        'easy',
        'common'
    );
    $: wordsToPlay = game.words;

	function keydown(event: KeyboardEvent) {
        game.recordKey(event.key);
        pressedKey = event.key;
	}
    function recordKey() {
        //record the key pressed
        
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
</div>