<script>
// @ts-nocheck

	import { saveNote } from '$lib/services/saveNote';

	// @ts-nocheck
	import throttle from 'lodash.throttle';
	import { onMount } from 'svelte';
	/**
	 * @type {import("@editorjs/editorjs").default}
	 */
	let editor;
	let noteTitle;
	let jsonTitle = {};

	// AUTO SAVE FUNCTION
	// TODO DEFINE MS
	// DEFINE IP PROTOCOL

	const delay = 300;
	const throttleSave = throttle(() => {
		save();
	}, delay);

	// TODO ONCHANGE
	/**
	 * @param {Event} e
	 */
	const handleSave = (e) => {
		throttleSave(e);
	};

	async function save() {
		try {
			const data = await editor.save();
			saveNote(data)
		} catch (error) {
			console.error('ERROR:', error);
		}
	}

	// Input Title JSON
	/**
	 * @param {Event} e
	 */
	function submitInputTitle(e) {
		const input = e.target.value;
		jsonTitle = { title: input };
		console.log(JSON.stringify(jsonTitle));
	}

	onMount(async () => {
		const EditorJS = (await import('@editorjs/editorjs')).default;
		const Header = (await import('@editorjs/header')).default;
		const Checklist = (await import('@editorjs/checklist')).default;
		const List = (await import('@editorjs/list')).default;
		const Quote = (await import('@editorjs/quote')).default;
		editor = new EditorJS({
			autofocus: true,
			holder: 'editor',
			tools: {
				header: Header,
				checklist: {
					class: Checklist,
					inlineToolbar: true,
					shortcut: 'CMD+SHIFT+C'
				},
				list: {
					class: List,
					inlineToolbar: true,
					shortcut: 'CMD+SHIFT+L',
					config: {
						defaultStyle: 'unordered'
					}
				},
				quote: {
					class: Quote,
					inlineToolbar: true,
					shortcut: 'CMD+SHIFT+O'
				}
			},
			onChange: handleSave
			
		});
	});
</script>
<svelte:head>
	<title>{noteTitle || 'Default - Notez'}</title>
</svelte:head>
<section class="flex flex-col items-center w-full p-4">
	<input on:change={submitInputTitle} bind:value={noteTitle} placeholder="Notez Title" />
	<div class="editor w-full" id="editor" ></div>
</section>

