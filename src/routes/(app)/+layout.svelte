<script>
	import { page } from '$app/stores';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	import { EditOutline, OpenDoorOutline } from 'flowbite-svelte-icons';
	$: activeUrl = $page.url.pathname;

	const iconClass =
		'w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white';
	const sidebarClass =
		'flex w-full min-h-screen overflow-y-auto overflow-x-hidden top-0 left-0 min-w-[80px] max-w-[240px]';
</script>

<main class="w-full flex">
	<Sidebar {activeUrl} class={sidebarClass}>
		<SidebarWrapper class="flex flex-col w-full">
			<SidebarGroup class="flex flex-col flex-1">
				<SidebarItem label="Note 1">
					<svelte:fragment slot="icon">
						<EditOutline class={iconClass} />
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem label="Note 2">
					<svelte:fragment slot="icon">
						<EditOutline class={iconClass} />
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem label="Note 3">
					<svelte:fragment slot="icon">
						<EditOutline class={iconClass} />
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>
			<SidebarGroup>
				<SidebarItem class="text-red-500" label="Sair">
					<svelte:fragment slot="icon">
						<OpenDoorOutline class={iconClass} />
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
	<slot />
</main>
