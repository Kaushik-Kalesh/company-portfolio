import { S as escape_html, a as head, i as ensure_array_like, x as attr } from "../../../chunks/server.js";
import { t as content_default } from "../../../chunks/content.js";
import { t as ScrollReveal } from "../../../chunks/ScrollReveal.js";
//#region ../data/portfolio.json
var portfolio_default = [];
//#endregion
//#region src/lib/Portfolio.svelte
function Portfolio($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section id="portfolio" class="section portfolio-section svelte-qzkvnv"><div class="container">`);
		ScrollReveal($$renderer, {
			children: ($$renderer) => {
				$$renderer.push(`<div class="portfolio-header svelte-qzkvnv"><h2 data-content-id="portfolio_headline" class="svelte-qzkvnv">${escape_html(content_default.portfolio_headline)}</h2> <p data-content-id="portfolio_subheadline" class="svelte-qzkvnv">${escape_html(content_default.portfolio_subheadline)}</p></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> <div class="portfolio-grid svelte-qzkvnv"><!--[-->`);
		const each_array = ensure_array_like(portfolio_default);
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let project = each_array[i];
			ScrollReveal($$renderer, {
				delay: i * 140,
				children: ($$renderer) => {
					$$renderer.push(`<div class="card portfolio-card svelte-qzkvnv"${attr("data-project-id", project.id)}><div class="card-accent-bar svelte-qzkvnv"></div> <div class="portfolio-card-header svelte-qzkvnv"><span class="project-client svelte-qzkvnv">${escape_html(project.client)}</span> <span class="project-index svelte-qzkvnv">${escape_html(String(i + 1).padStart(2, "0"))}</span></div> <h3 class="project-name svelte-qzkvnv">${escape_html(project.name)}</h3> <p class="project-desc svelte-qzkvnv">${escape_html(project.description)}</p> <div class="project-tags svelte-qzkvnv"><!--[-->`);
					const each_array_1 = ensure_array_like(project.tags);
					for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
						let tag = each_array_1[$$index];
						$$renderer.push(`<span class="tag svelte-qzkvnv">${escape_html(tag)}</span>`);
					}
					$$renderer.push(`<!--]--></div> <div class="project-arrow svelte-qzkvnv"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"></path></svg></div></div>`);
				},
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!--]--></div></div></section> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/routes/portfolio/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		head("1uo84gz", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Our Portfolio | ${escape_html(content_default.companyName)}</title>`);
			});
			$$renderer.push(`<meta name="description" content="View our latest custom software solutions and digital marketing projects."/>`);
		});
		$$renderer.push(`<div class="portfolio-page svelte-1uo84gz">`);
		Portfolio($$renderer, {});
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
export { _page as default };
