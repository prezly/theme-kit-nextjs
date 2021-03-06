import type { NextPageContext } from 'next';

import { getPrezlyApi } from '../../../data-fetching';

import { createPaths } from './createPaths';
import { SitemapBuilder } from './SitemapBuilder';

export function getSitemapServerSideProps(additionalPaths?: string[]) {
    return async function getServerSideProps(ctx: NextPageContext) {
        const { res, req } = ctx;

        if (!req || !res) {
            // client side
            return {
                props: {},
            };
        }

        const baseUrl = req.headers.host || '/';

        const api = getPrezlyApi(req);
        const stories = await api.getAllStories();
        const categories = await api.getCategories();

        const paths = createPaths(stories, categories);
        const sitemapBuilder = new SitemapBuilder(baseUrl);

        sitemapBuilder.addUrl('/');
        paths.forEach((path) => sitemapBuilder.addUrl(path));

        if (additionalPaths) {
            additionalPaths.forEach((path) => sitemapBuilder.addUrl(path));
        }

        res.setHeader('Content-Type', 'text/xml');
        res.write(sitemapBuilder.serialize());
        res.end();

        return {
            props: {},
        };
    };
}
