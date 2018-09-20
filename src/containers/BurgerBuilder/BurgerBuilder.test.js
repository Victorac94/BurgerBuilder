import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe("<BurgerBuilder />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    // onInitIngredients() hay que ponerlo porque lo ejecutamos en componentDidMount() y si no lo ponemos
    // en este archivo el test nos dará error diciendo que esa función no existe. Hay que ponerlo antes del it()
  });

  it("should render <BuildControls /> when receiving ingredients", () => {
    wrapper.setProps({ings: {salad: 0}});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});

// Más info en la Clase 346
