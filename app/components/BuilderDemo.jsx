import {RenderContent, getContent, isPreviewing} from '@builder.io/sdk-react';
import {useEffect, useState} from 'react';
/**
 * In our app, we've chosen to wrap Remix's `Link` component to add
 * helper functionality. If the `to` value is a string (not object syntax),
 * we prefix the locale to the path if there is one.
 *
 * You could implement the same behavior throughout your app using the
 * Remix-native nested routes. However, your route and component structure
 * changes the level of nesting required to get the locale into the route,
 * which may not be ideal for shared components or layouts.
 *
 * Likewise, your internationalization strategy may not require a locale
 * in the pathname and instead rely on a domain, cookie, or header.
 *
 * Ultimately, it is up to you to decide how to implement this behavior.
 */
export function BuilderDemo(props) {
  const [content, setContent] = useState(undefined);

  useEffect(() => {
    getContent({
      model: 'page',
      apiKey: '0eed6b8cdef047658652879b5de72b72',
      userAttributes: {
        urlPath: '/builders/testing' || '/',
      },
    }).then((content) => {
      setContent(content);
    });
  }, []);

  const shouldRenderBuilderContent = content || isPreviewing();

  return shouldRenderBuilderContent ? (
    <RenderContent
      content={content}
      model="page"
      apiKey={'0eed6b8cdef047658652879b5de72b72'}
    />
  ) : (
    <div></div>
  );
}
