import React from 'react';
import Timeout from '../Timeout';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

jest.useFakeTimers();

test('clicking on button makes it disabled', () => {
  // set a rendered `Timeout` to a deconstructed `getByText`
  const { getByText } = render(<Timeout />);
  // set the component text "Click to trigger timeout" to a button variable
  const button = getByText("Click to trigger timeout");
  // verify that the button is presently not disabled
  expect(button.disabled).toBeFalsy();
  // simulate a click event on the button variable text
  fireEvent.click(button);
  // verify that the button is disabled following the click event
  expect(button.disabled).toBeTruthy();
});

test('clicking on button displays timeout message', () => {
  // set a rendered `Timeout` to a deconstructed `getByText`, `queryByTestId`, and `getByTestId`
  const { getByText, queryByTestId, getByTestId } = render(<Timeout />);
  // set the component text "Click to trigger timeout" to a button variable
  const button = getByText("Click to trigger timeout");
  // verify that the queried element id "timeout-message" does not have content and returns null
  expect(queryByTestId("timeout-message")).toBeNull();
  // simulate a click event on the button variable text
  fireEvent.click(button);
  // verify that the queried element id "timeout-message" has new content that reads "This will timeout in 5 seconds" following the click event
  expect(getByTestId("timeout-message").textContent).toBe("This will timeout in 5 seconds");
  // simulate running all timers
  jest.runAllTimers();
  // verify that the queried element id "timeout-message" has new content that reads "This will timeout in 5 seconds" following all timers being ran
  expect(getByTestId("timeout-message").textContent).toBe("Timeout!");
});