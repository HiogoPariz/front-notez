<script>
	import { SignIn } from '@auth/sveltekit/components';

</script>

<svelte:head>
	<title>Login to notez</title>
</svelte:head>

<main class="flex justify-center items-center w-full h-screen">
	<div
		class="flex flex-col gap-4 justify-center items-center p-8 bg-gray-300 border border-gray-600 rounded-xl"
	>
		<h1>Login</h1>
        <SignIn provider="google"></SignIn>
	</div>
</main>
