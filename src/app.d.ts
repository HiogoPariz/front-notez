// See https://kit.svelte.dev/docs/types#app
export interface Session {
	user: User;
	expires: Date;
}

export interface User {
	name: string;
	email: string;
	image: string;
}

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session?: Session;
			auth(): Promise<Session>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };

