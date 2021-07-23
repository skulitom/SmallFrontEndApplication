import * as React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../src/components/pages/HomePage';

describe('Home Page is Rendered', () => {
  it('Renders Grid component', () => {
    const wrapper = shallow(<HomePage data={[]} />);
    expect(wrapper.find('DataGrid').exists()).toEqual(true);
  });
});