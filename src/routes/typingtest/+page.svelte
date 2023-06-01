<script lang="ts">
	import { Game } from '../sverdle/game';

    let pressedKey = '';

	function keydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			console.log('enter');
		}
        pressedKey = event.key;
	}
    function startNewGame() {
        //game should have word settings, like word dictionary, play style, etc.
        let game = new Game();
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

    <p>Pressed key: {pressedKey}</p>
</div>