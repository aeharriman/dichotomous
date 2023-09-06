# Task Tracking 

Task tracking started on 9/5/23.

---
ButtonTree Component
---

### Name:
State variables need to initialize as expected

### Shall:

- [ ] When rendered, should render buttons with text from first node from dichotomousKey it was rendered with
- [ ] When on final node, should render final selection in an h1 instead of buttons

[//]: # (- [ ] Shall set `currentIndex` to 1 initially)
[//]: # (- [ ] Shall set `isDone` to `false` initially)
[//]: # (- [ ] Shall set `isStart` to `true` initially)
[//]: # (- [ ] Shall set `finalSelection` to an empty string initially)
[//]: # (- [ ] Shall set `history` to an empty array initially)

### Progress:
TODO

---

### Name:
Need a button that sets dichotomousKey state object to empty

### Shall:
- [ ] Shall set `dichotomousKey` to an empty object when `handleGoBack` is invoked
- [ ] Page shall revert to input form when `Go back to key entry page` button is clicked 
- [ ] Shall display the "Go back to key entry page" button always


### Progress:
TODO

---

### Name:
Need a button that brings the button tree to the previous state

### Shall:

[//]: # (- [ ] Shall update `currentIndex` to the last element in `history` when `handlePrevious` is invoked)
[//]: # (- [ ] Shall update `history` by removing its last element when `handlePrevious` is invoked)
[//]: # (- [ ] Shall set `isDone` to `false` when `handlePrevious` is invoked)
- [ ] Page shall revert to previous state when `Previous` button is clicked

### Progress:
TODO

---

### Name:
Need to keep track of whether page is on the first node so that previous button shows up

### Shall:

[//]: # (- [ ] Shall set `isStart` to `true` when `history.length` is not 0)
[//]: # (- [ ] Shall set `isStart` to `false` when `history.length` is 0)
- [ ] `Previous` button shall be on page when not on first button node
- [ ] `Previous` button shall not be on page when on first button node

### Progress:
TODO

---

### Name:
Need to advance the index of the dichotomous key based on what generated button is clicked

### Shall:

[//]: # (- [ ] Shall update `currentIndex` based on the `goTo` value of the selected subKey if it is a number)
[//]: # (- [ ] Shall update `finalSelection` and set `isDone` to `true` if the `goTo` value of the selected subKey is a string)
- [ ] Page shall generate buttons based on the next node for the previous button that was clicked.

### Progress:
TODO

---

### Name:
Buttons need to be generated based on what key and index state variables are set to

### Shall:
- [ ] Shall dynamically create buttons based on the `dichotomousKey` and `currentIndex`
- [ ] Shall assign the correct text to each button based on the `text` property of each subKey
- [ ] Page shall display the correct buttons for the current index


### Progress:
TODO

---
Description Component
---
---

### Name:
Need to integrate Auth0 functionality so that profile can be displayed and login/logout can be rendered conditionally

### Shall:
- [ ] Shall use `useAuth0` to fetch `user` data
- [ ] Shall not throw any errors related to Auth0 integration
- [ ] Shall display the `LoginButton` when `user` is `null` or `undefined`
- [ ] Shall not display `IconProfile` and `LogoutButton` when `user` is `null` or `undefined`
- [ ] Shall display `IconProfile` and `LogoutButton` when `user` is not `null` or `undefined`
- [ ] Shall not display `LoginButton` when `user` is not `null` or `undefined`

### Progress:
TODO

---

### Name:
User interface needs to have layout with title and description on the left and login/logout stuff on the right

### Shall:
- [ ] Shall contain a `Row` with two `Col` elements
- [ ] Shall display the title "Dichotomous" in the first `Col`
- [ ] Shall display the description "Turn a textual dichotomous key into an interactive one" in the first `Col`
- [ ] Shall display login button in the second `Col` when user is logged out
- [ ] Shall display logout button in the second `Col` when user is logged in
- [ ] Shall display profile button in the second `Col` when user is logged in

### Progress:
TODO

---
IconProfile Component
---
---

### Name:
User interface needs to show and close modal properly based on SVG button

### Shall:
- [ ] Shall display an SVG icon to represent the profile
- [ ] Shall render a Modal when icon is clicked
- [ ] Shall close the Modal when the "Close" button is clicked
- [ ] Shall close the Modal when the Modal's header X close button is clicked

[//]: # (- [ ] Shall render a Modal when `isProfileVisible` is `true`)
[//]: # (- [ ] Shall not render a Modal when `isProfileVisible` is `false`)
[//]: # (- [ ] Shall initially set `isProfileVisible` state to `false`)
[//]: # (- [ ] Shall set `isProfileVisible` to `true` when `handleIconClick` is invoked)
[//]: # (- [ ] Shall set `isProfileVisible` to `false` when `handleClose` is invoked)

### Progress:
TODO

---

### Name:
Modal needs to have title, profile, and close button

### Shall:
- [ ] Shall display "Profile" as the title of the Modal
- [ ] Shall render the `Profile` component inside the Modal body
- [ ] Shall contain a "Close" button in the Modal footer

### Progress:
TODO

---

Profile Component
---
---

### Name:
Needs to display a loading icon when profile is loading

### Shall:
- [ ] Shall display "Loading..." when `isLoading` is `true`
- [ ] Shall not display any user information when `isLoading` is `true`

### Progress:
TODO

---

### Name:
Needs to show details for the user

### Shall:

- [ ] Shall display the user's picture when `isAuthenticated` and `user` are both `true`
- [ ] Shall display the user's name when `isAuthenticated` and `user` are both `true`
- [ ] Shall display the user's email when `isAuthenticated` and `user` are both `true`
- [ ] Shall return `null` when `isAuthenticated` is `false`
- [ ] Shall return `null` when `user` is `null` or `undefined`

### Progress:
TODO

---

### Name:
Needs to integrate with Auth0 to get the user details

### Shall:
- [ ] Shall use `useAuth0` to fetch `user`, `isAuthenticated`, and `isLoading` without causing console errors

### Progress:
TODO


---
InputForm Component
---
---

### Name:
Needs to integrate with auth0 to make decisions based on authentication details

### Shall:
- [ ] Shall not throw any errors related to Auth0 user authentication in the console
- [ ] Shall successfully retrieve an access token when a user is authenticated
- [ ] Shall not make an axios request when the user is not authenticated
- [ ] Shall correctly request a new access token when the existing one expires
- [X] Shall mock `useAuth0` function to simulate auth0 functionality
- [X] Shall run all tests without throwing "Failed to fetch keys: Error: You forgot to wrap your component in <Auth0Provider>.
  at getAccessTokenSilently"

### Progress:
TODO

---

### Name:
Form validation and submission needs to work as expected

### Shall:
- [ ] setDichotomousKey, when a valid dichotomous key string is in the textarea, shall be called with a KeyObject on submit
- [ ] Shall set the dichotomousKey state correctly upon submission
- [X] Clicking submit shall call setDichotomousKey with a non-empty form
- [X] Clicking submit shall do nothing if form empty
- [X] Shall allow text input in the textarea

[//]: # (- [ ] Shall call handleSubmit when submit button clicked)


### Progress:
TODO

---

### Name:
Tabs functionality needs to work so that the correct tabs are associated with the correct detail

### Shall:

- [ ] Clicking on tab1 shall cause fish key to be in value of textarea
- [ ] If nothing clicked, found in water key shall be in value of textarea

[//]: # (- [ ] Shall correctly display tabs for each active key present in the activeKeys state)
[//]: # (- [ ] Shall set the `activeTab` state to the clicked tab's event key)
[//]: # (- [ ] Shall update the `form` state when a new tab is selected to reflect the selected key's content)
[//]: # (- [ ] Shall automatically select the tab named `default` as the default active tab)

### Progress:
TODO

---

### Name:
String needs to be transformed on submit to correct certain irregularities

### Shall:

- [ ] Shall correctly replace ellipsis with periods
- [ ] Shall correctly add a dot after numbers followed by a letter
- [ ] Shall correctly add spaces before and after sequences of periods
- [ ] Shall ensure that every (number).(character) is followed by a period

### Progress:
TODO

---

### Name:
Axios needs to be integrated properly and make correct get request

### Shall:
- [ ] Shall successfully make a GET request to the given URL
- [ ] Shall update the `activeKeys` state with the keys retrieved from the server
- [ ] Shall catch and log errors to the console in case of a failure
- [ ] Shall handle server timeouts
- [ ] Shall handle different types of HTTP response status codes other than success (2xx)
- [ ] Shall merge retrieved keys correctly with pre-existing keys in the `activeKeys` state

### Progress:
TODO

---

### Name:
User interface needs to show the correct details
### Shall:
- [X] Shall render all relevant components without error

### Progress:
Completed 9/5/23


---
InputPage Component
---
---

### Name:
Need to fix axios import error: "SyntaxError: Cannot use import statement outside a module"

### Shall:
- [X] Shall run all InputPage Component tests without causing "SyntaxError: Cannot use import statement outside a module" on the console

### Progress:
Completed - added transformIgnorePatterns for axios to jest in package.json - 9/5/23

---

### Name:
Conditional rendering of elements on page needs to be determined by length of dichotomousKey object in state

### Shall:
- [X] Shall render Description and InputForm when the state of the dichotomousKey is at length 0
- [X] Shall render Description and ButtonTree when the dichotomousKey state is length over 0

### Progress:
Completed 9/5/23

---
Already tested before this was written:
LoginButton
LogoutButton

