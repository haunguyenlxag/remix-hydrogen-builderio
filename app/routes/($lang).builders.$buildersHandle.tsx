import {builder, BuilderComponent, BuilderContent} from '@builder.io/react';
import {Await, useLoaderData} from '@remix-run/react';
import {Suspense} from 'react';
builder.init('0eed6b8cdef047658652879b5de72b72');

const BUILDER_MODEL = 'page';

export async function loader() {
  const builderContent = await builder
    .get(BUILDER_MODEL, {
      userAttributes: {
        urlPath: '/builder/testing',
      },
    })
    .toPromise();

  if (!builderContent) {
    throw new Response('Not found', {status: 404});
  }

  return builderContent;
}

// this gives full compatibility to BuilderContent type and Remix starter
// See: https://github.com/BuilderIO/builder/issues/1387#issuecomment-1397442797
type BuilderContentRemix = Omit<BuilderContent, 'variations' | 'data'>;

export default function Builders() {
  console.log('test abc');
  const builderContent: BuilderContentRemix =
    useLoaderData<BuilderContentRemix>();

  return (
    <Suspense>
      <Await resolve={builderContent}>
        <BuilderComponent content={builderContent} model={BUILDER_MODEL} />
      </Await>
    </Suspense>
  );
}
