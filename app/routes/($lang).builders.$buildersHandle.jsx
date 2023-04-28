import {BuilderDemo} from '~/components';

export async function loader() {
  const builderContent = null;
  return builderContent;
}

// this gives full compatibility to BuilderContent type and Remix starter
// See: https://github.com/BuilderIO/builder/issues/1387#issuecomment-1397442797
//type BuilderContentRemix = Omit<BuilderContent, 'variations' | 'data'>;

export default function Builders() {
  return <BuilderDemo />;
}
