import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems /> ', () => {
	let wrapper;
    let wrapperWithAuth;

	wrapper = shallow(<NavigationItems />);
	wrapperWithAuth = shallow(<NavigationItems isAuthenticated />);
    
	it('render 2 NavigationItem elems if not auth', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});
    
	it('render 3 NavigationItem elems if yes auth', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />);
       // wrapper.setProps({isAuthenticated: true})
		expect(wrapperWithAuth.find(NavigationItem)).toHaveLength(3);
    });
    
    it('should an exact logout button', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />);
        //wrapper.setProps({isAuthenticated: true})
        expect(wrapperWithAuth.contains(<NavigationItem link='/logout' >Logout</NavigationItem>))
        .toEqual(true)
	});
});
