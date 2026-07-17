
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const ANTIGRAVITY_SOURCE_METADATA: string;
	export const DokanLibrary2: string;
	export const USERNAME: string;
	export const npm_package_json: string;
	export const PROCESSOR_REVISION: string;
	export const HOMEPATH: string;
	export const windir: string;
	export const npm_package_name: string;
	export const USERPROFILE: string;
	export const ComSpec: string;
	export const PROCESSOR_LEVEL: string;
	export const EFC_8600_4126798990: string;
	export const LOCALAPPDATA: string;
	export const npm_package_version: string;
	export const NODE: string;
	export const ProgramData: string;
	export const configsetroot: string;
	export const npm_config_user_agent: string;
	export const USERDOMAIN: string;
	export const NODE_ENV: string;
	export const npm_node_execpath: string;
	export const PWD: string;
	export const USERDOMAIN_ROAMINGPROFILE: string;
	export const SystemRoot: string;
	export const ANTIGRAVITY_CSRF_TOKEN: string;
	export const ANTIGRAVITY_TRAJECTORY_ID: string;
	export const npm_execpath: string;
	export const POSH_INSTALLER: string;
	export const ProgramW6432: string;
	export const JAVA_HOME: string;
	export const ANTIGRAVITY_SAFECLIS_SOURCE: string;
	export const PROCESSOR_ARCHITECTURE: string;
	export const ChocolateyLastPathUpdate: string;
	export const npm_lifecycle_event: string;
	export const ANTIGRAVITY_PROJECT_ID: string;
	export const OneDrive: string;
	export const DokanLibrary2_LibraryPath_x64: string;
	export const FPS_BROWSER_APP_PROFILE_STRING: string;
	export const PATHEXT: string;
	export const GOPATH: string;
	export const DriverData: string;
	export const npm_lifecycle_script: string;
	export const CommonProgramW6432: string;
	export const PATH: string;
	export const NUMBER_OF_PROCESSORS: string;
	export const PROCESSOR_IDENTIFIER: string;
	export const ProgramFiles: string;
	export const TEMP: string;
	export const DokanLibrary2_LibraryPath_x86: string;
	export const FPS_BROWSER_USER_PROFILE_STRING: string;
	export const SystemDrive: string;
	export const npm_command: string;
	export const POSH_THEMES_PATH: string;
	export const ANTIGRAVITY_AGENT: string;
	export const ANDROID_SDK_ROOT: string;
	export const ANDROID_HOME: string;
	export const npm_config_local_prefix: string;
	export const CommonProgramFiles: string;
	export const ANTIGRAVITY_CONVERSATION_ID: string;
	export const ChocolateyToolsLocation: string;
	export const HOMEDRIVE: string;
	export const SVELTEKIT_FORK: string;
	export const EFC_8600_1592913036: string;
	export const ChocolateyInstall: string;
	export const LOGONSERVER: string;
	export const TMP: string;
	export const SESSIONNAME: string;
	export const APPDATA: string;
	export const ALLUSERSPROFILE: string;
	export const OS: string;
	export const PUBLIC: string;
	export const PSModulePath: string;
	export const COMPUTERNAME: string;
	export const VBOX_HWVIRTEX_IGNORE_SVM_IN_USE: string;
	export const ANTIGRAVITY_LS_ADDRESS: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		ANTIGRAVITY_SOURCE_METADATA: string;
		DokanLibrary2: string;
		USERNAME: string;
		npm_package_json: string;
		PROCESSOR_REVISION: string;
		HOMEPATH: string;
		windir: string;
		npm_package_name: string;
		USERPROFILE: string;
		ComSpec: string;
		PROCESSOR_LEVEL: string;
		EFC_8600_4126798990: string;
		LOCALAPPDATA: string;
		npm_package_version: string;
		NODE: string;
		ProgramData: string;
		configsetroot: string;
		npm_config_user_agent: string;
		USERDOMAIN: string;
		NODE_ENV: string;
		npm_node_execpath: string;
		PWD: string;
		USERDOMAIN_ROAMINGPROFILE: string;
		SystemRoot: string;
		ANTIGRAVITY_CSRF_TOKEN: string;
		ANTIGRAVITY_TRAJECTORY_ID: string;
		npm_execpath: string;
		POSH_INSTALLER: string;
		ProgramW6432: string;
		JAVA_HOME: string;
		ANTIGRAVITY_SAFECLIS_SOURCE: string;
		PROCESSOR_ARCHITECTURE: string;
		ChocolateyLastPathUpdate: string;
		npm_lifecycle_event: string;
		ANTIGRAVITY_PROJECT_ID: string;
		OneDrive: string;
		DokanLibrary2_LibraryPath_x64: string;
		FPS_BROWSER_APP_PROFILE_STRING: string;
		PATHEXT: string;
		GOPATH: string;
		DriverData: string;
		npm_lifecycle_script: string;
		CommonProgramW6432: string;
		PATH: string;
		NUMBER_OF_PROCESSORS: string;
		PROCESSOR_IDENTIFIER: string;
		ProgramFiles: string;
		TEMP: string;
		DokanLibrary2_LibraryPath_x86: string;
		FPS_BROWSER_USER_PROFILE_STRING: string;
		SystemDrive: string;
		npm_command: string;
		POSH_THEMES_PATH: string;
		ANTIGRAVITY_AGENT: string;
		ANDROID_SDK_ROOT: string;
		ANDROID_HOME: string;
		npm_config_local_prefix: string;
		CommonProgramFiles: string;
		ANTIGRAVITY_CONVERSATION_ID: string;
		ChocolateyToolsLocation: string;
		HOMEDRIVE: string;
		SVELTEKIT_FORK: string;
		EFC_8600_1592913036: string;
		ChocolateyInstall: string;
		LOGONSERVER: string;
		TMP: string;
		SESSIONNAME: string;
		APPDATA: string;
		ALLUSERSPROFILE: string;
		OS: string;
		PUBLIC: string;
		PSModulePath: string;
		COMPUTERNAME: string;
		VBOX_HWVIRTEX_IGNORE_SVM_IN_USE: string;
		ANTIGRAVITY_LS_ADDRESS: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
