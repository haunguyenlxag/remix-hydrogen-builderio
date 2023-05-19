// import { builder, BuilderComponent, useIsPreviewing } from '@builder.io/react'
import type {BuilderContent} from '@builder.io/sdk';

// @ts-ignore next-line
import {RenderContent, getContent, isPreviewing} from '@builder.io/sdk-react';
import {ShouldRevalidateFunction, useLoaderData} from '@remix-run/react';
import {LoaderArgs} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {BuilderDemo} from '~/components';

const pageModel = 'page';

export const handle = {
  seo: {
    title: "Chubbies Shorts - Proper Length Men's Shorts & So Much More",
    description:
      'The weekend has arrived. Get the good times fired up. Shop our raddest weekend-built gear, and get free shipping & free returns.',
  },
};

export default function Builders() {
  return (
    <div>
      <Suspense>
        <BuilderDemo />
      </Suspense>
    </div>
  );
}
