import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import Google from '@auth/core/providers/google';
import { SvelteKitAuth } from '@auth/sveltekit';
console.log({GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET})
export const {
	handle: atuhHandle,
	signIn,
	signOut
} = SvelteKitAuth({
	providers: [Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })]
});
