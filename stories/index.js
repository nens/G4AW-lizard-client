import React from 'react';
import { Provider } from 'react-redux';
import SearchBar from '../src/components/SearchBar.jsx';
import { theStore } from '../src/store/Store';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('Button', module)
  .add('with text', () => (
    <button onClick={action('clicked')}>Hello Button</button>
  ))
  .add('with some emoji', () => (
    <button onClick={action('clicked')}>😀 😎 👍 💯</button>
  ));

storiesOf('SearchBar', module)
  .addDecorator((getStory) => (
    <Provider store={theStore}>
      { getStory() }
    </Provider>
  ))
  .add('empty bar', () => (
    <SearchBar />
  ));
