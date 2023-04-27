import {json, type LoaderArgs} from '@shopify/remix-oxygen';
import type {Page as PageType} from '@shopify/hydrogen/storefront-api-types';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';
import {PageHeader} from '~/components';
import {CACHE_LONG, routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';
import {BuilderComponent, builder} from '@builder.io/react';
import {Builder} from '@builder.io/sdk';
builder.init('0eed6b8cdef047658652879b5de72b72');
export const headers = routeHeaders;

export async function loader({request, params, context}: LoaderArgs) {
  console.log('test builder');
  const pathname = '/builder/testing';

  // Fetch data content from Builder.io based on the URL path
  const content = await builder
    .get('page', {
      userAttributes: {
        urlPath: pathname,
      },
    })
    .toPromise();
  //console.log(content);
  const seo = null;

  return json(
    {seo, content},
    {
      headers: {
        'Cache-Control': CACHE_LONG,
      },
    },
  );
}

export default function Builders() {
  const {content} = useLoaderData<typeof loader>();
  console.log(content);
  return (
    <>
      <PageHeader heading="Test builder">
        <div>
          <h2>Testing builder.io</h2>
          <BuilderComponent model="page" content={content?.data} />
        </div>
      </PageHeader>
    </>
  );
}
