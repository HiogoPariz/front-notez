import { redirect } from "@sveltejs/kit";

/** @param {import("@sveltejs/kit").RequestEvent} event */
export async function load({ locals }) {
    if(!locals.session ) {
        return redirect(302, "/login")
    }
    return
}

/** @param {import("@sveltejs/kit").RequestEvent} event */
// async function action(event) {
//     if(!event.locals.session) {
//         return fail(401)
//     }
//     deleteSessionTokenCookie(event)
//     return redirect(302, "/login")
// } 

/** @type {import("@sveltejs/kit").Actions} */
// export const actions = {
//     default: action
// }