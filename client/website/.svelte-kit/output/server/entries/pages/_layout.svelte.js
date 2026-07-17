import { S as escape_html, a as head, c as unsubscribe_stores, t as attr_class, x as attr } from "../../chunks/server.js";
import { t as content_default } from "../../chunks/content.js";
import "../../chunks/stores.js";
//#region src/lib/Navbar.svelte
function Navbar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let scrolled = false;
		let mobileMenuOpen = false;
		$$renderer.push(`<nav${attr_class("navbar svelte-11lpkcp", void 0, { "scrolled": scrolled })}><div class="navbar-inner svelte-11lpkcp"><a href="/#hero" class="nav-logo svelte-11lpkcp">${escape_html(content_default.companyName)}</a> <div${attr_class("nav-links svelte-11lpkcp", void 0, { "open": mobileMenuOpen })}><a href="/#services" class="nav-link svelte-11lpkcp">Services</a> <a href="/portfolio" class="nav-link svelte-11lpkcp">Portfolio</a> <a href="/#contact" class="nav-link svelte-11lpkcp">Contact</a></div> <button class="mobile-toggle svelte-11lpkcp" aria-label="Toggle navigation menu"><span${attr_class("hamburger svelte-11lpkcp", void 0, { "open": mobileMenuOpen })}><span class="svelte-11lpkcp"></span> <span class="svelte-11lpkcp"></span> <span class="svelte-11lpkcp"></span></span></button></div></nav> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/lib/Footer.svelte
function Footer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<footer class="footer svelte-9sff3o"><div class="container"><div class="footer-inner svelte-9sff3o"><div class="footer-brand svelte-9sff3o"><div class="footer-logo svelte-9sff3o">`);
		if (content_default.logoUrl) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<img${attr("src", content_default.logoUrl)}${attr("alt", content_default.companyName)} class="logo-img svelte-9sff3o"/>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`${escape_html(content_default.companyName)}`);
		}
		$$renderer.push(`<!--]--></div> <p class="footer-tagline svelte-9sff3o" data-content-id="footer_tagline">${escape_html(content_default.footer_tagline)}</p></div> <div class="footer-links svelte-9sff3o"><div class="footer-col svelte-9sff3o"><h4 class="footer-col-title svelte-9sff3o">Navigate</h4> <a href="/#services" class="footer-link svelte-9sff3o">Services</a> <a href="/portfolio" class="footer-link svelte-9sff3o">Portfolio</a> <a href="/#contact" class="footer-link svelte-9sff3o">Contact</a></div> <div class="footer-col svelte-9sff3o"><h4 class="footer-col-title svelte-9sff3o">Connect</h4> <a href="https://wa.me/918015777932" target="_blank" rel="noopener noreferrer" class="footer-link svelte-9sff3o">WhatsApp</a> <span class="footer-link footer-link-placeholder svelte-9sff3o">LinkedIn</span></div></div></div> <div class="footer-bottom svelte-9sff3o"><span>© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} ${escape_html(content_default.companyName)}. All rights reserved.</span></div></div></footer>`);
	});
}
//#endregion
//#region src/lib/WhatsAppFab.svelte
function WhatsAppFab($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<a href="https://wa.me/918015777932" target="_blank" rel="noopener noreferrer"${attr_class("whatsapp-fab svelte-z7bbx2", void 0, { "visible": false })} aria-label="Chat on WhatsApp"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg></a>`);
	});
}
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children } = $$props;
		head("12qhfyh", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(content_default.metaTitle || content_default.companyName + " — Custom Software & Digital Marketing")}</title>`);
			});
			$$renderer.push(`<meta name="description"${attr("content", content_default.metaDescription || content_default.companyName + " builds custom software solutions and delivers digital marketing that scales your business. From CRMs to AI infrastructure — if you can dream it, we can build it.")} class="svelte-12qhfyh"/> <meta property="og:title"${attr("content", content_default.metaOgTitle || content_default.companyName + " — Custom Software & Digital Marketing")} class="svelte-12qhfyh"/> <meta property="og:description"${attr("content", content_default.metaOgDescription || "Custom software solutions & digital marketing that scale your business.")} class="svelte-12qhfyh"/> <meta property="og:image"${attr("content", content_default.ogImageUrl || "/og-image.jpg")} class="svelte-12qhfyh"/>`);
		});
		Navbar($$renderer, {});
		$$renderer.push(`<!----> <div class="global-bg-shapes svelte-12qhfyh"><div class="shape shape-1 svelte-12qhfyh"></div> <div class="shape shape-2 svelte-12qhfyh"></div> <div class="shape shape-3 svelte-12qhfyh"></div></div> <main class="svelte-12qhfyh">`);
		children($$renderer);
		$$renderer.push(`<!----></main> `);
		Footer($$renderer, {});
		$$renderer.push(`<!----> `);
		WhatsAppFab($$renderer, {});
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _layout as default };
