/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import Listing from '../client/src/components/Listing';

let wrapper;

beforeEach(() => {
  const listing = {
    _id: 'ObjectId("5bdbcd8f303ab15ab44946bb")',
    images: [
      'https://s3-us-west-1.amazonaws.com/airbnb-clone-images/id_3_img1.jpg',
      'https://s3-us-west-1.amazonaws.com/airbnb-clone-images/id_3_img2.jpg',
      'https://s3-us-west-1.amazonaws.com/airbnb-clone-images/id_3_img3.jpg',
      'https://s3-us-west-1.amazonaws.com/airbnb-clone-images/id_3_img4.jpg',
      'https://s3-us-west-1.amazonaws.com/airbnb-clone-images/id_3_img5.jpg',
    ],
    id: 20,
    saved: false,
    type: 'ENTIRE HOME',
    beds: '4 BEDS',
    title: 'Quinoa vivamus in Cambridgeshire',
    price: 130,
    ratings: 142,
    average_rating: 5,
    __v: 0,
  };
  wrapper = shallow(<Listing listing={listing} />);
});

describe('Listing Component Unit Tests', () => {
  test('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });
  test('renders 5 stars', () => {
    expect(wrapper.find('.stars')).toHaveLength(5);
  });
});
