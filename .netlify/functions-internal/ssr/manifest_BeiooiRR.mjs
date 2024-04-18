import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import './chunks/astro_DXcyt0Je.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"affiliate/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/affiliate","isIndex":false,"type":"page","pattern":"^\\/affiliate\\/?$","segments":[[{"content":"affiliate","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/affiliate.astro","pathname":"/affiliate","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"api/views","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/views","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/views\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"views","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/views.ts","pathname":"/api/views","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"guides/post-1/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/guides/post-1","isIndex":false,"type":"page","pattern":"^\\/guides\\/post-1\\/?$","segments":[[{"content":"guides","dynamic":false,"spread":false}],[{"content":"post-1","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/guides/post-1.mdx","pathname":"/guides/post-1","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"guides/post-2/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/guides/post-2","isIndex":false,"type":"page","pattern":"^\\/guides\\/post-2\\/?$","segments":[[{"content":"guides","dynamic":false,"spread":false}],[{"content":"post-2","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/guides/post-2.mdx","pathname":"/guides/post-2","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"guides/post-3/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/guides/post-3","isIndex":false,"type":"page","pattern":"^\\/guides\\/post-3\\/?$","segments":[[{"content":"guides","dynamic":false,"spread":false}],[{"content":"post-3","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/guides/post-3.mdx","pathname":"/guides/post-3","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"guides/post-4/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/guides/post-4","isIndex":false,"type":"page","pattern":"^\\/guides\\/post-4\\/?$","segments":[[{"content":"guides","dynamic":false,"spread":false}],[{"content":"post-4","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/guides/post-4.mdx","pathname":"/guides/post-4","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"guides/post-5/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/guides/post-5","isIndex":false,"type":"page","pattern":"^\\/guides\\/post-5\\/?$","segments":[[{"content":"guides","dynamic":false,"spread":false}],[{"content":"post-5","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/guides/post-5.mdx","pathname":"/guides/post-5","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"guides/post-6/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/guides/post-6","isIndex":false,"type":"page","pattern":"^\\/guides\\/post-6\\/?$","segments":[[{"content":"guides","dynamic":false,"spread":false}],[{"content":"post-6","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/guides/post-6.mdx","pathname":"/guides/post-6","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"guides/post-7/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/guides/post-7","isIndex":false,"type":"page","pattern":"^\\/guides\\/post-7\\/?$","segments":[[{"content":"guides","dynamic":false,"spread":false}],[{"content":"post-7","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/guides/post-7.mdx","pathname":"/guides/post-7","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"guides/post-8/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/guides/post-8","isIndex":false,"type":"page","pattern":"^\\/guides\\/post-8\\/?$","segments":[[{"content":"guides","dynamic":false,"spread":false}],[{"content":"post-8","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/guides/post-8.mdx","pathname":"/guides/post-8","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"post/post-2/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/post/post-2","isIndex":false,"type":"page","pattern":"^\\/post\\/post-2\\/?$","segments":[[{"content":"post","dynamic":false,"spread":false}],[{"content":"post-2","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/post/post-2.mdx","pathname":"/post/post-2","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"post/post-3/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/post/post-3","isIndex":false,"type":"page","pattern":"^\\/post\\/post-3\\/?$","segments":[[{"content":"post","dynamic":false,"spread":false}],[{"content":"post-3","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/post/post-3.mdx","pathname":"/post/post-3","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"post/post-4/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/post/post-4","isIndex":false,"type":"page","pattern":"^\\/post\\/post-4\\/?$","segments":[[{"content":"post","dynamic":false,"spread":false}],[{"content":"post-4","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/post/post-4.mdx","pathname":"/post/post-4","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"post/post-5/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/post/post-5","isIndex":false,"type":"page","pattern":"^\\/post\\/post-5\\/?$","segments":[[{"content":"post","dynamic":false,"spread":false}],[{"content":"post-5","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/post/post-5.mdx","pathname":"/post/post-5","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"post/post-6/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/post/post-6","isIndex":false,"type":"page","pattern":"^\\/post\\/post-6\\/?$","segments":[[{"content":"post","dynamic":false,"spread":false}],[{"content":"post-6","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/post/post-6.mdx","pathname":"/post/post-6","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"post/post-7/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/post/post-7","isIndex":false,"type":"page","pattern":"^\\/post\\/post-7\\/?$","segments":[[{"content":"post","dynamic":false,"spread":false}],[{"content":"post-7","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/post/post-7.mdx","pathname":"/post/post-7","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"post/welcome/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/post/welcome","isIndex":false,"type":"page","pattern":"^\\/post\\/welcome\\/?$","segments":[[{"content":"post","dynamic":false,"spread":false}],[{"content":"welcome","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/post/welcome.mdx","pathname":"/post/welcome","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.6.3_@types+node@20.12.7_sass@1.75.0_typescript@5.4.5/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://astro-moon-landing.netlify.app/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/master/Documents/code/astro_altebikeofficial/src/pages/affiliate.astro",{"propagation":"in-tree","containsHead":true}],["/Users/master/Documents/code/astro_altebikeofficial/node_modules/.pnpm/accessible-astro-components@2.3.5/node_modules/accessible-astro-components/DarkMode.astro",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/node_modules/.pnpm/accessible-astro-components@2.3.5/node_modules/accessible-astro-components/index.js",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/components/accordian.astro",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/layouts/PostLayout.astro",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/guides/post-1.mdx",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/guides/post-1@_@mdx",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/components/horizontalbar-guides.astro",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/layouts/BlogLayout.astro",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/guides/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/guides/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/post/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/post/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/tags/[tag].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/tags/[tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/components/sidebar.astro",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/guides/post-2.mdx",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/guides/post-2@_@mdx",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/guides/post-3.mdx",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/guides/post-3@_@mdx",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/guides/post-4.mdx",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/guides/post-4@_@mdx",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/guides/post-5.mdx",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/guides/post-5@_@mdx",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/guides/post-6.mdx",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/guides/post-6@_@mdx",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/guides/post-7.mdx",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/guides/post-7@_@mdx",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/guides/post-8.mdx",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/guides/post-8@_@mdx",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/post/post-2.mdx",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/post/post-2@_@mdx",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/components/alltags.astro",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/components/footer2.astro",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/layouts/BaseLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/affiliate@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/components/horizontalbar.astro",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/components/topnews.astro",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/post/post-3.mdx",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/post/post-3@_@mdx",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/post/post-4.mdx",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/post/post-4@_@mdx",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/post/post-5.mdx",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/post/post-5@_@mdx",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/post/post-6.mdx",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/post/post-6@_@mdx",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/post/post-7.mdx",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/post/post-7@_@mdx",{"propagation":"in-tree","containsHead":false}],["/Users/master/Documents/code/astro_altebikeofficial/src/pages/post/welcome.mdx",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/post/welcome@_@mdx",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-manifest":"manifest_BeiooiRR.mjs","/Users/master/Documents/code/astro_altebikeofficial/node_modules/.pnpm/@astrojs+react@3.3.0_@types+react-dom@18.2.25_@types+react@18.2.79_react-dom@18.2.0_react@18._eka3pddb5pxlbmgl6xml5krqzq/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.6.3_@types+node@20.12.7_sass@1.75.0_typescript@5.4.5/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_hukWElc9.mjs","\u0000@astro-page:src/pages/affiliate@_@astro":"chunks/affiliate_DA4GNjNu.mjs","\u0000@astro-page:src/pages/api/views@_@ts":"chunks/views_CzSYFOEe.mjs","\u0000@astro-page:src/pages/guides/post-1@_@mdx":"chunks/post-1_DMUV94rz.mjs","\u0000@astro-page:src/pages/guides/post-2@_@mdx":"chunks/post-2_BN3fxdbO.mjs","\u0000@astro-page:src/pages/guides/post-3@_@mdx":"chunks/post-3_DezwoPdc.mjs","\u0000@astro-page:src/pages/guides/post-4@_@mdx":"chunks/post-4_DKStVlqj.mjs","\u0000@astro-page:src/pages/guides/post-5@_@mdx":"chunks/post-5_CYTWfEmQ.mjs","\u0000@astro-page:src/pages/guides/post-6@_@mdx":"chunks/post-6_FMql4Rnj.mjs","\u0000@astro-page:src/pages/guides/post-7@_@mdx":"chunks/post-7_PiOMwkEV.mjs","\u0000@astro-page:src/pages/guides/post-8@_@mdx":"chunks/post-8_CcfqLIET.mjs","\u0000@astro-page:src/pages/guides/[...page]@_@astro":"chunks/_.._xbUfao4J.mjs","\u0000@astro-page:src/pages/post/post-2@_@mdx":"chunks/post-2_DoS8ewXa.mjs","\u0000@astro-page:src/pages/post/post-3@_@mdx":"chunks/post-3_CRLHm1W5.mjs","\u0000@astro-page:src/pages/post/post-4@_@mdx":"chunks/post-4_Bk3LvVIz.mjs","\u0000@astro-page:src/pages/post/post-5@_@mdx":"chunks/post-5_CZQq-ivX.mjs","\u0000@astro-page:src/pages/post/post-6@_@mdx":"chunks/post-6_BQ0IUtAB.mjs","\u0000@astro-page:src/pages/post/post-7@_@mdx":"chunks/post-7_D9PP7tnG.mjs","\u0000@astro-page:src/pages/post/welcome@_@mdx":"chunks/welcome_S-8yOvg5.mjs","\u0000@astro-page:src/pages/post/[...page]@_@astro":"chunks/_.._BFXHlcWa.mjs","\u0000@astro-page:src/pages/tags/[tag]@_@astro":"chunks/_tag__DMH8bq_s.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_CuLHrOKN.mjs","/Users/master/Documents/code/astro_altebikeofficial/src/layouts/PostLayout.astro":"chunks/PostLayout_DPiVbO5a.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.6qrOC2R4.js","@astrojs/svelte/client.js":"_astro/client.Cx1FBVJX.js","/Users/master/Documents/code/astro_altebikeofficial/src/components/FetchViews.svelte":"_astro/FetchViews.DaNH-0xc.js","@astrojs/react/client.js":"_astro/client.CwWKiGVO.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/inter-cyrillic-variable-wghtOnly-normal.DHeaknKs.woff2","/_astro/inter-cyrillic-ext-variable-wghtOnly-normal.CBYe6022.woff2","/_astro/inter-greek-variable-wghtOnly-normal.RGdUHdk5.woff2","/_astro/inter-greek-ext-variable-wghtOnly-normal.vpOIeGzY.woff2","/_astro/inter-latin-variable-wghtOnly-normal.DwMxL0mc.woff2","/_astro/inter-vietnamese-variable-wghtOnly-normal.CZXuW_xV.woff2","/_astro/inter-latin-ext-variable-wghtOnly-normal.Wjt_kzju.woff2","/_astro/cake.DrKcMle2.webp","/_astro/affiliate.jUTSjhe5.css","/_astro/affiliate.CopxRXeu.css","/_astro/post-1.PnfA4VnU.css","/ebikenook.svg","/favicon.svg","/logo.png","/social.jpg","/_astro/FetchViews.DaNH-0xc.js","/_astro/client.CwWKiGVO.js","/_astro/client.Cx1FBVJX.js","/affiliate/index.html","/api/views","/guides/post-1/index.html","/guides/post-2/index.html","/guides/post-3/index.html","/guides/post-4/index.html","/guides/post-5/index.html","/guides/post-6/index.html","/guides/post-7/index.html","/guides/post-8/index.html","/post/post-2/index.html","/post/post-3/index.html","/post/post-4/index.html","/post/post-5/index.html","/post/post-6/index.html","/post/post-7/index.html","/post/welcome/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false});

export { manifest };
