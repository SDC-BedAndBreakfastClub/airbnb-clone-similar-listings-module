/* eslint-env jest */

import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../client/src/components/App';

let wrapper;
const mockListings = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

beforeEach(() => {
  wrapper = shallow(<App />, { disableLifecycleMethods: true });
  wrapper.setState({
    listings: mockListings,
    displacement: 0,
  });
});

describe('App Component Unit Tests', () => {
  test('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });
  test('carousel should load in first position', () => {
    expect(wrapper.state('displacement')).toBe(0);
  });
  test('slideRight button should be hidden on load', () => {
    expect(wrapper.find('.prev-arrow').exists()).toBe(false);
  });
  test('slideLeft button should be visible on load', () => {
    expect(wrapper.find('.next-arrow').exists()).toBe(true);
  });
  test('slideRight button should appear after sliding left', () => {
    expect(wrapper.find('.prev-arrow')).toHaveLength(0);
    wrapper.find('.next-arrow').simulate('click');
    expect(wrapper.find('.prev-arrow')).toHaveLength(1);
  });
  test('slideLeft button should disappear when at left end', () => {
    wrapper.setState({ displacement: -99.6 });
    expect(wrapper.find('.next-arrow').exists()).toBe(false);
  });
  test('slideLeft button should alter displacement', () => {
    wrapper.find('.next-arrow').simulate('click');
    expect(wrapper.state('displacement')).toBeLessThan(-8);
  });
  test('slideRight button should alter displacement', () => {
    wrapper.setState({ displacement: -99.6 });
    wrapper.find('.prev-arrow').simulate('click');
    expect(wrapper.state('displacement')).toBeCloseTo(-91.3, 1);
  });
});
