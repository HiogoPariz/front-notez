<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import throttle from 'lodash.throttle';
	let editor

	// AUTO SAVE FUNCTION
	// TODO DEFINE MS
	// DEFINE IP PROTOCOL
	const delay = 300;
	const throttleKeydownSave = throttle(() => {
		save();
	}, delay);

	const handleKeydown = (e) => {
		throttleKeydownSave(e);
	};

	async function save() {
		const url = 'http://0.0.0.0:5432/autosave';
		try {
			const data = await editor.save();
			console.log({data})
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			const json = await res.json();
		} catch (error) {
			console.error('ERROR:', error);
		}
	}

	onMount(
		async () => {
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
		            shortcut: 'CMD+SHIFT+C',
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
				},
			}
		})
		}
	);
</script>

<svelte:window on:keydown={handleKeydown} />
<div class="editor" id="editor"/>
