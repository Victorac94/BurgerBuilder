import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe("<NavigationItems />", () => {
  let wrapper;

  // beforeEach() se ejecuta antes de cada it()
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("should render two <NavigationItem /> elements if not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItem /> elements if authenticated", () => {
    // wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should show an exact logout button", () => {
    // Esperamos encontrar un <NavigationItem></NavigationItem> si estamos autentificados
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    // .toEqual(true) quiere ver si lo que sacamos de expect() es true, o sea, que el wrapper contenga
    // el <NavigationItem link="/logout">Logout</NavigationItem>
  });
});

/* Lo importante para empezar a testear es ver que son las cosas cruciales que cambian dependiendo de cosas externas
   como por ejemplo el isAuthenticated */

/* configure() .find() .setProps() beforeEach() nos lo ofrece 'enzyme' */
/* describe() it() expect() .toHaveLength() nos lo ofrece 'jest' */

/*
  Más info sobre Jest en https://jestjs.io/docs/en/getting-started.html
  https://jestjs.io/docs/en/expect (Expect)
  https://jestjs.io/docs/en/mock-function-api (Mock functions (async code))
*/

/*
  Más info sobre Enzyme en https://airbnb.io/enzyme/
  https://airbnb.io/enzyme/docs/guides.html (how to use it in other test runners)
  https://airbnb.io/enzyme/docs/api/shallow.html (shallow rendering)
*/
