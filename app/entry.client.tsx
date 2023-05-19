import {RemixBrowser} from '@remix-run/react';
import {startTransition, StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';
import {Counter, Hello} from './components';
import {registerComponent} from '@builder.io/sdk-react';
import '@builder.io/widgets';

registerComponent(Counter, {
  name: 'Counter',
});

registerComponent(Hello, {
  name: 'Hello',
  inputs: [{name: 'title', type: 'text', defaultValue: 'Heading World!!!'}],
  image:
    'https://tabler-icons.io/static/tabler-icons/icons-png/3d-cube-sphere-off.png',
});

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
  );
});
