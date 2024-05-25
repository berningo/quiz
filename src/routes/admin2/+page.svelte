<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
</script>

<nav>
	<div class="actions">
		{#if $page.data.session}
			{#if $page.data.session.user?.image}
				<img src={$page.data.session.user.image} class="avatar" alt="User Avatar" />
			{/if}
			<span class="signedInText">
				<small>Signed in as</small><br />
				<strong>{$page.data.session.user?.name ?? 'User'}</strong>
			</span>
			<button on:click={() => signOut()}> Sign Out </button>
		{:else}
			<span class="notSignedInText">You are not signed in</span>
			<div class="wrapper-form">
				<button on:click={() => signIn('github')}>Sign In with GitHub</button>
			</div>
		{/if}
	</div>
</nav>
