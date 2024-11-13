import { redirect } from "@sveltejs/kit";

/** @param {import("@sveltejs/kit").RequestEvent} event */
export async function load(event) {
	if (event.locals.session) {
		return redirect(302, "/");
	}
	return {};
}