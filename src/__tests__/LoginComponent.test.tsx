
// Jest's describe function creates a test suite for grouping any number of test cases (optional)
import {mount, shallow} from "enzyme";
import LoginComponent from "../components/LoginComponent";
import {Typography} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import ErrorMessageComponent from "../components/ErrorMessageComponent";

// Jest mocks
import {authenticate} from "../remote/auth-service";
jest.mock('../remote/auth-service');

describe('LoginComponent Test Suite', () => {

    // Jest's beforeAll method is a function that runs once before all test cases in this suite have ran
    // Jest's afterAll method is a function that runs once after all test cases in this suite have ran
    // Jest's beforeEach method is a function that runs before each test cases in this suite runs
    // Jest's afterEach method is a function that runs after each test cases in this suite runs

    afterEach(() => {
        jest.resetAllMocks();
    });

    // Jest's test function (alternative: it function) takes a description string and a function that will be our test case

    it('LoginComponent renders successfully', () => {

        // Mock up the props
        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        // Use Enzyme's shallow function to render only the specified component (none of its children)
        const wrapper = shallow(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn}/>);

        // Jest's expect function is similar to the Assert class and its methods from JUnit.
        expect(wrapper).toBeTruthy();

    });

    it('Renders the login header', () => {

        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        // Enzyme's shallow function returns a ShallowWrapper object instance that contains our rendered component
        const wrapper = shallow(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn}/>);

        const expectedHeader = <Typography align="center" variant="h4">Log In To Your Bookstore Account!</Typography>;

        // Using the wrapper instance, in conjunction with Jest's expect function, we can check that certain
        // aspects of our component were rendered properly.
        expect(wrapper.contains(expectedHeader)).toEqual(true);

    });

    it('Username and password fields start empty', () => {

        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        const wrapper = shallow(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn}/>);

        // The ShallowWrapper instance exposes a find method that can be used to query the rendered component
        // It returns another instance of ShallowWrapper, containing the selected DOM element
        let usernameInputWrapper = wrapper.find('#username');
        let passwordInputWrapper = wrapper.find('#password');

        // For debugging purposes, its useful to see what the wrapper objects contain.
        // For this, we use ShallowWrapper's debug method
        // console.log(usernameInputWrapper.debug());

        expect(usernameInputWrapper.text()).toBe('');
        expect(passwordInputWrapper.text()).toBe('');

    });

    it('Clicking login button with missing form field values displays error message', () => {

        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        // We need to use Enzyme's mount function so that child components are rendered
        const wrapper = mount(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn}/>);

        let loginButtonWrapper = wrapper.find('#login-button').at(0);

        loginButtonWrapper.simulate('click');

        let expectedErrorComponent = <ErrorMessageComponent errorMessage={'You need to provide both a username and a password'}/>;
        let expectedAlert = <Alert severity="error">You need to provide both a username and a password</Alert>;

        expect(wrapper.contains(expectedErrorComponent)).toBe(true);
        expect(wrapper.contains(expectedAlert)).toBe(true);

    });

    it('Clicking login button with valid form field values attempts to login', () => {

        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        const wrapper = mount(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn}/>);

        let usernameInput = wrapper.find('input[name="username"]');
        let passwordInput =  wrapper.find('input[name="password"]');
        let loginButtonWrapper = wrapper.find('button');

        usernameInput.simulate('change', {target: {name: 'username', value: 'test-username'}});
        passwordInput.simulate('change', {target: {name: 'password', value: 'test-password'}});
        loginButtonWrapper.simulate('click');

        expect(authenticate).toBeCalledTimes(1);

    });

});