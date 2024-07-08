<script>
	// @ts-nocheck
	import { onMount } from 'svelte';

	let editor;

	onMount(async () => {
		const EditorJS = (await import('@editorjs/editorjs')).default;
		const Header = (await import('@editorjs/header')).default;
		const Checklist = (await import('@editorjs/checklist')).default;
		const List = (await import('@editorjs/list')).default;
		const Quote = (await import('@editorjs/quote')).default;

		editor = new EditorJS({
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
				}
			}
		});
	});
</script>

<div id="editor" class=""></div>
