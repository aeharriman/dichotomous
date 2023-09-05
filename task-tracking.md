# Task Tracking 

Task tracking started on 9/5/23.

---
## ButtonTree
---

### Name:
ButtonTree - Initial State Management

### Shall:
- [ ] Shall set `currentIndex` to 1 initially
- [ ] Shall set `isDone` to `false` initially
- [ ] Shall set `isStart` to `true` initially
- [ ] Shall set `finalSelection` to an empty string initially
- [ ] Shall set `history` to an empty array initially

### Progress:
TODO

---

### Name:
ButtonTree - handleGoBack Function

### Shall:
- [ ] Shall set `dichotomousKey` to an empty object when `handleGoBack` is invoked

### Progress:
TODO

---

### Name:
ButtonTree - handlePrevious Function

### Shall:
- [ ] Shall update `currentIndex` to the last element in `history` when `handlePrevious` is invoked
- [ ] Shall update `history` by removing its last element when `handlePrevious` is invoked
- [ ] Shall set `isDone` to `false` when `handlePrevious` is invoked

### Progress:
TODO

---

### Name:
ButtonTree - useEffect Functionality

### Shall:
- [ ] Shall set `isStart` to `true` when `history.length` is not 0
- [ ] Shall set `isStart` to `false` when `history.length` is 0

### Progress:
TODO

---

### Name:
ButtonTree - handleSelection Function

### Shall:
- [ ] Shall update `currentIndex` based on the `goTo` value of the selected subKey if it is a number
- [ ] Shall update `finalSelection` and set `isDone` to `true` if the `goTo` value of the selected subKey is a string
- [ ] Shall throw an error gracefully if the `goTo` value is neither a string nor a number

### Progress:
TODO

---

### Name:
ButtonTree - createButtons Function

### Shall:
- [ ] Shall dynamically create buttons based on the `dichotomousKey` and `currentIndex`
- [ ] Shall assign the correct text to each button based on the `text` property of each subKey

### Progress:
TODO

---

### Name:
ButtonTree - UI/UX

### Shall:
- [ ] Shall display the "Previous" button only when `isStart` is true
- [ ] Shall display the "Go back to key entry page" button always

### Progress:
TODO

---
## Description
---

### Name:
Description - Auth0 Integration and State Management

### Shall:
- [ ] Shall use `useAuth0` to fetch `user` data
- [ ] Shall not throw any errors related to Auth0 integration

### Progress:
TODO

---

### Name:
Description - UI Layout

### Shall:
- [ ] Shall contain a `Row` with two `Col` elements
- [ ] Shall display the title "Dichotomous" in the first `Col`
- [ ] Shall display the description "Turn a textual dichotomous key into an interactive one" in the first `Col`

### Progress:
TODO

---

### Name:
Description - User Not Logged In

### Shall:
- [ ] Shall display the `LoginButton` when `user` is `null` or `undefined`
- [ ] Shall not display `IconProfile` and `LogoutButton` when `user` is `null` or `undefined`

### Progress:
TODO

---

### Name:
Description - User Logged In

### Shall:
- [ ] Shall display `IconProfile` and `LogoutButton` when `user` is not `null` or `undefined`
- [ ] Shall not display `LoginButton` when `user` is not `null` or `undefined`

### Progress:
TODO

---

### Name:
Description - Responsive Design

### Shall:
- [ ] Shall maintain a responsive layout across different screen sizes, adjusting `Col` sizes as per Bootstrap classes

### Progress:
TODO


---
## IconProfile
---

### Name:
IconProfile - State Management

### Shall:
- [ ] Shall initially set `isProfileVisible` state to `false`
- [ ] Shall set `isProfileVisible` to `true` when `handleIconClick` is invoked
- [ ] Shall set `isProfileVisible` to `false` when `handleClose` is invoked

### Progress:
TODO

---

### Name:
IconProfile - UI Elements

### Shall:
- [ ] Shall display an SVG icon to represent the profile
- [ ] Shall render a Modal when `isProfileVisible` is `true`
- [ ] Shall not render a Modal when `isProfileVisible` is `false`

### Progress:
TODO

---

### Name:
IconProfile - Modal Content

### Shall:
- [ ] Shall display "Profile" as the title of the Modal
- [ ] Shall render the `Profile` component inside the Modal body
- [ ] Shall contain a "Close" button in the Modal footer

### Progress:
TODO

---

### Name:
IconProfile - Modal Interaction

### Shall:
- [ ] Shall close the Modal when the "Close" button is clicked
- [ ] Shall close the Modal when the Modal's header close button is clicked

### Progress:
TODO

---

### Name:
IconProfile - Auth0 Integration

### Shall:
- [ ] Shall not throw any errors related to Auth0
- [ ] Shall use `useAuth0` without causing console errors

### Progress:
TODO


---

## Profile
---

### Name:
Profile - Loading State

### Shall:
- [ ] Shall display "Loading..." when `isLoading` is `true`
- [ ] Shall not display any user information when `isLoading` is `true`

### Progress:
TODO

---

### Name:
Profile - Authenticated State

### Shall:
- [ ] Shall display the user's picture when `isAuthenticated` and `user` are both `true`
- [ ] Shall display the user's name when `isAuthenticated` and `user` are both `true`
- [ ] Shall display the user's email when `isAuthenticated` and `user` are both `true`

### Progress:
TODO

---

### Name:
Profile - Unauthenticated State

### Shall:
- [ ] Shall return `null` when `isAuthenticated` is `false`
- [ ] Shall return `null` when `user` is `null` or `undefined`

### Progress:
TODO

---

### Name:
Profile - Auth0 Integration

### Shall:
- [ ] Shall use `useAuth0` to fetch `user`, `isAuthenticated`, and `isLoading` without causing console errors

### Progress:
TODO


---
## InputForm
---

### Name:
InputForm - Auth0 User Authentication

### Shall:
- [ ] Shall not throw any errors related to Auth0 user authentication in the console
- [ ] Shall successfully retrieve an access token when a user is authenticated
- [ ] Shall not make an axios request when the user is not authenticated
- [ ] Shall correctly request a new access token when the existing one expires

### Progress:
TODO

---

### Name:
InputForm - Validation and Submission

### Shall:
- [ ] Shall validate that the form is not empty before allowing submission
- [ ] Shall correctly parse the entered dichotomous key string into a KeyObject on submit
- [ ] Shall set the dichotomousKey state correctly upon submission
- [ ] Shall console log "Tab selection logic not working as expected" only when an error occurs in tab selection

### Progress:
TODO

---

### Name:
InputForm - Tabs Functionality

### Shall:
- [ ] Shall correctly display tabs for each active key present in the activeKeys state
- [ ] Shall set the `activeTab` state to the clicked tab's event key
- [ ] Shall update the `form` state when a new tab is selected to reflect the selected key's content
- [ ] Shall automatically select the first tab as the default active tab

### Progress:
TODO

---

### Name:
InputForm - Process Function Tests

### Shall:
- [ ] Shall correctly replace ellipsis with periods
- [ ] Shall correctly add a dot after numbers followed by a letter
- [ ] Shall correctly add spaces before and after sequences of periods
- [ ] Shall ensure that every (number).(character) is followed by a period

### Progress:
TODO

---

### Name:
InputForm - Axios Integration

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
InputForm - UI/UX

### Shall:
- [ ] Shall render all Bootstrap components without error
- [ ] Shall allow text input in the textarea
- [ ] Shall prevent default form submission behavior

### Progress:
TODO


---
## InputPage
---

### Name:
InputPage - Fix axios import error

### Shall:
- [X] Shall run all InputPage Component tests without causing "SyntaxError: Cannot use import statement outside a module" on the console

### Progress:
Completed - added transformIgnorePatterns for axios to jest in package.json

---

### Name:
InputPage - rendering

### Shall:
- [X] Shall render description and input form when the state of the dichotomousKey is at length 0
- [X] Shall render description and ButtonTree when the dichotomousKey state is length over 0

### Progress:
Complete

---

### Name:
InputForm - Auth0Provider

### Shall:
- [X] Shall mock `useAuth0` function to simulate auth0 functionality
- [X] Shall run all tests without throwing "Failed to fetch keys: Error: You forgot to wrap your component in <Auth0Provider>.
  at getAccessTokenSilently"

### Progress:
Complete

