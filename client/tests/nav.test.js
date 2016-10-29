import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import createComponent from 'react-unit';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
const test = addAssertions(tape, {jsxEquals});

// Component to test
import Nav from '../components/Nav';

test('----- React Component Tests: Nav -----', (t) => {

  // Shallow rendering: Render React element only *one* level deep
  const component = createComponent.shallow(Nav);

  // Test component props and content
  t.equal(component.props.isAuthenticated, false, 'isAuthenticated should be false');
  // t.equal(component.text, 'share', 'Label props of component should be rendered as Nav text "share"');

  // Test rendered output
  const renderer = createRenderer();
  renderer.render(<Nav />);
  const result = renderer.getRenderOutput();
  t.jsxEquals(result, <div isAuthenticated='false'>nav stuff</div>);

  t.end();
});