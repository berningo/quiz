<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from '$app/navigation'
    
    export let data: PageData;

    function start() {
        goto("questions/0");
    }
</script>

<h2>Welcome to the Quiz!</h2>
<ul>
    <li>There are {data.numberOfQuestions} questions in this quiz.</li>
    <li>More than one answer per question can be correct. Choose them wisely!</li>
</ul>
<div>
    <button on:click={start}>Let's start</button>
</div>

<style>
    div {
        margin-top: 4em;
    }
</style>