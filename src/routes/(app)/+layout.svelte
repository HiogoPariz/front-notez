<script>
	import { page } from '$app/stores';
	import { SignOut } from '@auth/sveltekit/components';

	import { EyeOutline } from 'flowbite-svelte-icons';
	$: activeUrl = $page.url.pathname;
</script>

<main>
	<nav
		class="flex flex-shrink flex-col bg-gray-200 px-4 h-screen overflow-y-auto overflow-x-hidden py-2"
	>
		<ul class="flex flex-col px-0 h-full">
			<li>
				<a
					class="flex justify-between items-center whitespace-nowrap gap-4 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
					href="/"
				>
					<span>Note 1</span>
					<div class="w-5">
						<EyeOutline class="w-5 h-5" />
					</div>
				</a>
			</li>
		</ul>
		<div class="flex w-full">
			<SignOut
				class="w-full text-red-500 flex justify-between whitespace-nowrap gap-4 px-4 py-2 rounded-md hover:bg-red-100 transition-colors"
			></SignOut>
		</div>
	</nav>

	<slot />
</main>
