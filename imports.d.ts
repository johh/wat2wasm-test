/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */

declare module '*.bin' {
	const e: string;

	export default e;
}

declare module '*.hlsl' {
	export const vertexShader: string;
	export const fragmentShader: string;
	export const introspection: {
		attributes: Record<string, unknown>;
	};
}


declare const __IS_PRODUCTION_BUILD__: boolean;
