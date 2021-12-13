# svelte-typewriter-transition
A simple typewriter transition effect for Svelte applications with characters correction support.

## Install

```bash
npm i svelte-typewriter-transition
```

## Usage

Create a route store in your `stores.js`:
```svelte
{#if checked}
  <p transition:typewriter>
    One phrase text
  </p>

  <p transition:typewriter={{ speed: 200, separator: '\n'}}>
    Mulpi ph
    Multi phrase text wiith
    Multi phrase text with correction and decreased speed
  </p>
{/if}

<script>
  import typewriter from 'svelte-typewriter-transition'
  // ...
</script>
```
