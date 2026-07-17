import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.BWyuKDGH.js","_app/immutable/chunks/32xRXiSI.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/D8tU9OgR.js","_app/immutable/chunks/CcYcWQ4b.js","_app/immutable/chunks/yHKZFhc_.js"];
export const stylesheets = ["_app/immutable/assets/0.BTvvMFpT.css"];
export const fonts = [];
