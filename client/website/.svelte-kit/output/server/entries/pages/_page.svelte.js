import { S as escape_html, c as unsubscribe_stores, i as ensure_array_like, t as attr_class, x as attr } from "../../chunks/server.js";
import { t as content_default } from "../../chunks/content.js";
import "../../chunks/stores.js";
import { t as ScrollReveal } from "../../chunks/ScrollReveal.js";
//#region src/lib/Hero.svelte
function Hero($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let ready = false;
		$$renderer.push(`<section id="hero" class="hero-section svelte-qzo0r3"><div class="container hero-container svelte-qzo0r3"><div${attr_class("hero-badge svelte-qzo0r3", void 0, { "visible": ready })}><span class="badge-dot svelte-qzo0r3"></span> Custom Software &amp; Digital Marketing</div> <h1${attr_class("hero-headline svelte-qzo0r3", void 0, { "visible": ready })} data-content-id="hero_headline">${escape_html(content_default.hero_headline)}</h1> <p${attr_class("hero-subheadline svelte-qzo0r3", void 0, { "visible": ready })} data-content-id="hero_subheadline">${escape_html(content_default.hero_subheadline)}</p> <div${attr_class("hero-actions svelte-qzo0r3", void 0, { "visible": ready })}><a href="/#contact" class="btn btn-primary hero-btn svelte-qzo0r3">Get in Touch <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="svelte-qzo0r3"><path d="M5 12h14M12 5l7 7-7 7" class="svelte-qzo0r3"></path></svg></a> <a href="/portfolio" class="btn btn-outline hero-btn svelte-qzo0r3">Our Work</a></div></div> <div class="hero-deco-left svelte-qzo0r3"></div> <div class="hero-deco-right svelte-qzo0r3"></div></section>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/lib/Services.svelte
function Services($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const services = [
			{
				titleKey: "service_software_title",
				descKey: "service_software_desc",
				icon: "code"
			},
			{
				titleKey: "service_marketing_title",
				descKey: "service_marketing_desc",
				icon: "megaphone"
			},
			{
				titleKey: "service_both_title",
				descKey: "service_both_desc",
				icon: "rocket"
			},
			{
				titleKey: "service_infra_title",
				descKey: "service_infra_desc",
				icon: "server"
			}
		];
		$$renderer.push(`<section id="services" class="section services-section svelte-6t9lhf"><div class="container">`);
		ScrollReveal($$renderer, {
			children: ($$renderer) => {
				$$renderer.push(`<div class="services-header svelte-6t9lhf"><h2 data-content-id="services_headline" class="svelte-6t9lhf">${escape_html(content_default.services_headline)}</h2> <p data-content-id="services_subheadline" class="svelte-6t9lhf">${escape_html(content_default.services_subheadline)}</p></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> <div class="services-grid svelte-6t9lhf"><!--[-->`);
		const each_array = ensure_array_like(services);
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let service = each_array[i];
			ScrollReveal($$renderer, {
				delay: i * 120,
				children: ($$renderer) => {
					$$renderer.push(`<div class="card service-card svelte-6t9lhf"><div class="service-icon svelte-6t9lhf">`);
					if (service.icon === "code") {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`);
					} else if (service.icon === "megaphone") {
						$$renderer.push("<!--[1-->");
						$$renderer.push(`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>`);
					} else if (service.icon === "rocket") {
						$$renderer.push("<!--[2-->");
						$$renderer.push(`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12L3.269 3.126A59.768 59.768 0 0 1 21.485 12 59.77 59.77 0 0 1 3.27 20.876L5.999 12zm0 0h7.5"></path></svg>`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`);
					}
					$$renderer.push(`<!--]--></div> <h3${attr("data-content-id", service.titleKey)} class="svelte-6t9lhf">${escape_html(content_default[service.titleKey])}</h3> <p${attr("data-content-id", service.descKey)} class="svelte-6t9lhf">${escape_html(content_default[service.descKey])}</p> <div class="service-number svelte-6t9lhf">${escape_html(String(i + 1).padStart(2, "0"))}</div></div>`);
				},
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
//#region src/lib/Contact.svelte
function Contact($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let email = "";
		let reason = "";
		let remarks = "";
		let submitting = false;
		$$renderer.push(`<section id="contact" class="section contact-section svelte-1y6h5pf"><div class="container">`);
		ScrollReveal($$renderer, {
			children: ($$renderer) => {
				$$renderer.push(`<div class="contact-header svelte-1y6h5pf"><h2 data-content-id="contact_headline" class="svelte-1y6h5pf">${escape_html(content_default.contact_headline)}</h2> <p data-content-id="contact_subheadline" class="svelte-1y6h5pf">${escape_html(content_default.contact_subheadline)}</p></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> <div class="contact-layout svelte-1y6h5pf">`);
		ScrollReveal($$renderer, {
			delay: 100,
			children: ($$renderer) => {
				$$renderer.push(`<form class="contact-form card svelte-1y6h5pf"><div class="form-group"><label class="form-label" for="email">Email</label> <input type="email" id="email" class="form-input" placeholder="your@email.com" required=""${attr("value", email)}/></div> <div class="form-group"><label class="form-label" for="reason">Reason</label> `);
				$$renderer.select({
					id: "reason",
					class: "form-select",
					required: true,
					value: reason
				}, ($$renderer) => {
					$$renderer.option({
						value: "",
						disabled: true
					}, ($$renderer) => {
						$$renderer.push(`Select a reason`);
					});
					$$renderer.option({ value: "software" }, ($$renderer) => {
						$$renderer.push(`Software`);
					});
					$$renderer.option({ value: "marketing" }, ($$renderer) => {
						$$renderer.push(`Marketing`);
					});
					$$renderer.option({ value: "both" }, ($$renderer) => {
						$$renderer.push(`Both`);
					});
					$$renderer.option({ value: "other" }, ($$renderer) => {
						$$renderer.push(`Something Else`);
					});
				});
				$$renderer.push(`</div> <div class="form-group"><label class="form-label" for="remarks">Remarks</label> <textarea id="remarks" class="form-textarea" placeholder="Tell us about your project..." rows="4">`);
				const $$body = escape_html(remarks);
				if ($$body) $$renderer.push(`${$$body}`);
				$$renderer.push(`</textarea></div> <button type="submit" class="btn btn-primary submit-btn svelte-1y6h5pf"${attr("disabled", submitting, true)}>`);
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>`);
				$$renderer.push(`<!--]--></button> `);
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></form>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		ScrollReveal($$renderer, {
			delay: 200,
			children: ($$renderer) => {
				$$renderer.push(`<div class="contact-sidebar svelte-1y6h5pf"><div class="sidebar-block svelte-1y6h5pf"><h3 class="svelte-1y6h5pf">Prefer to chat?</h3> <p class="svelte-1y6h5pf">Drop us a message on WhatsApp and we'll respond
                            quickly.</p> <a href="https://wa.me/918015777932" target="_blank" rel="noopener noreferrer" class="btn btn-accent whatsapp-btn svelte-1y6h5pf"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg> Chat on WhatsApp</a></div> <div class="sidebar-block sidebar-info svelte-1y6h5pf"><div class="info-item svelte-1y6h5pf"><div class="info-label svelte-1y6h5pf">Response Time</div> <div class="info-value svelte-1y6h5pf">Within 24 hours</div></div> <div class="info-item svelte-1y6h5pf"><div class="info-label svelte-1y6h5pf">Location</div> <div class="info-value svelte-1y6h5pf">Chennai, India</div></div> <div class="info-item svelte-1y6h5pf"><div class="info-label svelte-1y6h5pf">Working Hours</div> <div class="info-value svelte-1y6h5pf">Anytime</div></div></div></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div></div></section>`);
	});
}
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer) {
	Hero($$renderer, {});
	$$renderer.push(`<!----> <hr class="dashed-separator"/> `);
	Services($$renderer, {});
	$$renderer.push(`<!----> <hr class="dashed-separator"/> `);
	Contact($$renderer, {});
	$$renderer.push(`<!---->`);
}
//#endregion
export { _page as default };
