export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","favicon.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.BLqvJubB.js",app:"_app/immutable/entry/app.CUKj95Rr.js",imports:["_app/immutable/entry/start.BLqvJubB.js","_app/immutable/chunks/yHKZFhc_.js","_app/immutable/chunks/32xRXiSI.js","_app/immutable/entry/app.CUKj95Rr.js","_app/immutable/chunks/32xRXiSI.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/portfolio"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
