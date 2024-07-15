<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import throttle from 'lodash.throttle';
	import { json } from '@sveltejs/kit';
	let editor
	let noteTitle 
	let jsonTitle = {}

	// AUTO SAVE FUNCTION
	// TODO DEFINE MS
	// DEFINE IP PROTOCOL
	
	const delay = 300;
	const throttleSave = throttle(() => {
		save();
	}, delay);
	
	// TODO ONCHANGE
	const handleSave = (e) => {
		throttleSave(e);
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

	// Input Title JSON
	function submitInputTitle(e){
		const input = event.target.value;
		jsonTitle = { "title": input }
		console.log(JSON.stringify(jsonTitle))
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
			},
			onChange: async() => {
				await handleSave();
			}
		})
		}
	);

</script>


<title>{noteTitle|| "Default - Notez"}</title>
<input on:change={submitInputTitle} bind:value={noteTitle} placeholder="Notez Title"/>
<div class="editor" id="editor"/>
