import * as React from 'react';
import { shallow } from 'enzyme';
import ChartsPage from '../src/components/pages/ChartsPage';

describe('Charts Page is Rendered', () => {
  it('Renders Bar Chart component', () => {
    const wrapper = shallow(<ChartsPage data={[]} />);
    expect(wrapper.find('Bar').exists()).toEqual(true);
  });
});