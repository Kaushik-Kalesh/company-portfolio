import { n as attr_style, s as stringify, t as attr_class } from "./server.js";
//#region src/lib/ScrollReveal.svelte
function ScrollReveal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children, threshold = .15, delay = 0, direction = "up", rootMargin = "0px 0px -60px 0px" } = $$props;
		let isRevealed = false;
		const translateMap = {
			up: "translateY(40px)",
			down: "translateY(-40px)",
			left: "translateX(40px)",
			right: "translateX(-40px)"
		};
		$$renderer.push(`<div${attr_class("scroll-reveal svelte-grwycz", void 0, { "revealed": isRevealed })}${attr_style(`--reveal-transform: ${stringify(translateMap[direction] || translateMap.up)}; --reveal-delay: ${stringify(delay)}ms;`)}>`);
		children($$renderer);
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
export { ScrollReveal as t };
