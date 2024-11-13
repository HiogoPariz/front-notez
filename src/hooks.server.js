import { atuhHandle } from '$lib/auth';
import { TokenBucket } from '$lib/rate-limit';
import { sequence } from '@sveltejs/kit/hooks';

const bucket = new TokenBucket(100, 1);

/** @type {import("@sveltejs/kit").Handle} */
const rateLimitHandle = async ({ event, resolve }) => {
	const clientIP = event.request.headers.get('X-Forwarded-For');
	if (clientIP === null) {
		return resolve(event);
	}
	/** @type {number} */
	let cost;
	if (event.request.method === 'GET' || event.request.method === 'OPTIONS') {
		cost = 1;
	} else {
		cost = 3;
	}
	if (!bucket.consume(clientIP, cost)) {
		return new Response('Too many requests', {
			status: 429
		});
	}
	return resolve(event);
};

/** @type {import("@sveltejs/kit").Handle} */
const sessionHandle = async ({ event, resolve }) => {
	const auth = await event.locals.auth();
    console.log(auth);
	if (auth) {
		event.locals.session = auth;
	}
	return resolve(event);
};

export const handle = sequence(rateLimitHandle, atuhHandle, sessionHandle);
