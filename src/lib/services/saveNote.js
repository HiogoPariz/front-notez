const url = `http://127.0.1.0:3000/note`;

/**
 * @param {EditorJS.OutputData} data
 */
export async function saveNote(data) {

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await res.json()
}