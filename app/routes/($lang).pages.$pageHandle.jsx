import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';
import {PageHeader} from '~/components';
import {CACHE_LONG, routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';

import {builder, BuilderComponent, BuilderContent} from '@builder.io/react';
import {Await} from '@remix-run/react';
import {Suspense} from 'react';
builder.init('0eed6b8cdef047658652879b5de72b72');
export const headers = routeHeaders;
const BUILDER_MODEL = 'page';
export async function loader({request, params, context}) {
  invariant(params.pageHandle, 'Missing page handle');

  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.pageHandle,
      language: context.storefront.i18n.language,
    },
  });
  const builderContent = await builder
    .get(BUILDER_MODEL, {
      userAttributes: {
        urlPath: '/builders/testing',
      },
    })
    .toPromise();
  if (!page) {
    throw new Response(null, {status: 404});
  }

  const seo = seoPayload.page({page, url: request.url});

  return json(
    {page, seo, builderContent},
    {
      headers: {
        'Cache-Control': CACHE_LONG,
      },
    },
  );
}

export default function Page() {
  const {page, builderContent} = useLoaderData();
  console.log(builderContent);
  return (
    <>
      <PageHeader heading={page.title}>
        <BuilderComponent content={builderContent} model={BUILDER_MODEL} />
      </PageHeader>
    </>
  );
}

const PAGE_QUERY = `#graphql
  query PageDetails($language: LanguageCode, $handle: String!)
  @inContext(language: $language) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;
