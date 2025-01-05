# react-fatless-form  🥬

_A lightweight React form library designed for simplicity that simplifies form handling and validation without unnecessary complexity or bloat._

`react-fatless-form` simplifies form management in React applications without leaving a huge footprint in your codebase. Whether you're building simple or complex forms, this package ensures a clean and intuitive experience with minimal setup.

## Why _fatless_?

I totally get it - most form packages out there come with way too much baggage. They bring along a laundry list of dependencies, leave a huge footprint in your codebase, and force you to deal with unnecessary complexity. It’s like they’re trying to do everything when all you want is a clean, simple solution that just works.

That’s why I went with the name `react-fatless-form`. It’s my way of saying, “Hey, this is the lean form package you’ve been looking for.” No fluff, no bloated abstractions, and no over-engineered features you’ll never use. It’s light, sleek, and designed to keep your codebase as clean as possible while still delivering all the functionality you actually need.

Think of it as a form library that’s been on a diet 😄. It’s still powerful, but it won’t weigh your project down. So if you’re tired of packages that feel like dragging a sofa through your app, give `react-fatless-form` a shot. You’ll feel the difference right away.

## Features

- **Lightweight**: Minimal bundle size to keep your project fast.
- **Developer-Oriented**: Designed to make form handling straightforward for developers.
- **Just Works**: No unnecessary abstractions - integrate seamlessly into your workflow.
- **Minimal Footprint**: Clean and readable codebase integration.
- **Validation Support**: Built-in support for schema-based validation with [Yup].
- **Customizable**: Easily adaptable to your specific form needs.

## Design Philosophy

- **Separation of Concerns:** Modular handling of state, validation, and submission.
- **Flexibility:** Allows developers full control over the form lifecycle.
- **Future-Proofing:** Supports evolving workflows without tightly coupling form state with submission logic.

## Installation

To get started, install `react-fatless-form`.

```bash
npm install react-fatless-form
```

or using Yarn:

```bash
yarn add react-fatless-form
```

## Provider

To use the package effectively, you need to wrap the relevant portion of your web app in the `FormProvider` component. This ensures that the form state, validation, and submission logic are available via React's context API to all components within the form.

The `FormProvider` component provides the `react-fatless-form` context to its children, enabling them to access and interact with the form state and lifecycle. Without the `FormProvider`, the components from `react-fatless-form` will not work correctly, as they rely on the context for managing form data.

To get started, import `FormProvider` and wrap your form in it. Pass the `form` instance (from the `useForm` hook) as a prop.

## Hooks

### `useForm`

The `useForm` hook is a robust and developer-friendly solution for managing form state, validation, submission lifecycle, and user interactions in React applications. This hook is highly flexible and can adapt to a wide variety of use cases while maintaining a clean and intuitive API.

### Features

- **Form State Management:** Tracks values, errors, and submission status.
- **Validation Workflow:** Integrates seamlessly with schema-based validation (e.g., [yup]).
- **Submission Lifecycle:** Provides functions to handle form submission and reset functionality.

### API Documentation

#### Signature

```typescript
export function useForm<T>(initialValues: T): {
    values: T;
    errors: Partial<Record<keyof T, string>>;
    touched: Partial<Record<keyof T, boolean>>;
    submissionStatus: "idle" | "submitting" | "success" | "error";
    setFieldValue: (field: keyof T, value: T[keyof T]) => void;
    setFieldArrayValue: (field: keyof T, value: string | string[]) => void;
    setFieldError: (field: keyof T, error: string) => void;
    setFieldTouched: (field: keyof T, touched: boolean) => void;
    validate: (validateFn: (values: T) => Partial<Record<keyof T, string>>) => boolean;
    resetForm: () => void;
    updateSubmissionStatus: (status: "idle" | "submitting" | "success" | "error") => void;
    resetSubmissionStatus: () => void;
};
```

#### Parameters

#### `initialValues: T`

**Description:** The initial state of the form’s values. Defines the default structure and data types of the form fields.
**Type:** `T` (generic type representing the shape of the form values)

#### Return value

The useForm hook returns an object containing the following state and functions:

##### State

##### `values: T`

The current state of the form’s values. Example:

```typescript
{ 
  username: "JohnDoe", 
  age: 25 
}
```

##### `errors: Partial<Record<keyof T, string>>`

An object storing validation errors for each field. Example:

```typescript
{ 
  username: "Username is required" 
}
```

##### `touched: Partial<Record<keyof T, boolean>>`

An object tracking whether a field has been interacted with. Example:

```typescript
{ 
  username: true 
}
```

##### `submissionStatus:` "idle" | "submitting" | "success" | "error"

The current status of the form submission. Possible values:

- "idle": No submission in progress.
- "submitting": Submission is in progress.
- "success": Submission completed successfully.
- "error": An error occurred during submission.

##### Functions

##### `setFieldValue(field: keyof T, value: T[keyof T]) => void`

Updates the value of a specific field. Example:

```typescript
form.setFieldValue("username", "JaneDoe")
```

##### `setFieldArrayValue(field: keyof T, value: string | string[]) => void`

Sets the value of a field as a string or an array of strings. Example:

```typescript
form.setFieldArrayValue("tags", ["React", "JavaScript"]);
```

##### `setFieldError(field: keyof T, error: string) => void`

Sets an error message for a specific field. Example

```typescript
 form.setFieldError("username", "Username is required");
```

##### `setFieldTouched(field: keyof T, touched: boolean) => void`

Marks a field as touched or untouched. Example:

```typescript
form.setFieldTouched("username", true);
```

##### `validate(validateFn: (values: T) => Partial<Record<keyof T, string>>) => boolean`

Validates the form using a custom validation function. `validateFn` receives the current form values and returns an object with field-specific error messages. Returns `true` if validation passes (no errors), otherwise `false`.

##### `resetForm() => void`

Resets the form’s values, errors, and touched fields to their initial state. Example:

```typescript
form.resetForm();
```

##### `updateSubmissionStatus(status: "idle" | "submitting" | "success" | "error") => void`

Updates the submissionStatus to reflect the current state of submission. Example:

```typescript
form.updateSubmissionStatus("submitting");
```

##### `resetSubmissionStatus() => void`

Resets the submissionStatus to "idle". Example:

```typescript
form.resetSubmissionStatus()
```

> **Note:** Leaving the form in a `"success"` or `"error"` state can cause issues when using `useForm` in multiple places. For example, submission-related logic tied to `"idle"` won't execute if the form never returns to the `"idle"` state. You must ensure `resetSubmissionStatus` is called to reset the form's state. More on this later.

#### Example usage

> **Note:** This example will be used throughout the remaining documentation, undergoing progressive refinements.

```tsx
import { FormProvider, useForm } from "react-fatless-form";

function MyForm() {
    const { 
      validate, 
      values,
      errors, 
      updateSubmissionStatus, 
      resetForm, 
      resetSubmissionStatus,
      setFieldValue,
      setFieldTouched,
    } = useForm({ username: "", age: 0 });

    const validateFn = values => {
        const errors = {};
        if (!values.username) errors.username = "Username is required";
        if (values.age <= 0) errors.age = "Age must be positive";
        return errors;
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        
        if (!validate(() => validateFn(values))) {
            console.warn("Validation failed");
            return;
        }
        
        updateSubmissionStatus("submitting");
        
        try {
            await apiCall(values);
            updateSubmissionStatus("success");
            resetForm();
        } catch (error) {
            console.error("Error during submission:", error);
            updateSubmissionStatus("error");
        } finally {
            resetSubmissionStatus();
        }
    };

    return (
        <FormProvider form={form}>
            <form onSubmit={onSubmit}>
                <input
                    value={values.username}
                    onChange={(e) => setFieldValue("username", e.target.value)}
                    onBlur={() => setFieldTouched("username", true)}
                />
                {errors.username && <span>{errors.username}</span>}
    
                <input
                    type="number"
                    value={values.age}
                    onChange={(e) => setFieldValue("age", parseInt(e.target.value, 10))}
                    onBlur={() => setFieldTouched("age", true)}
                />
                {errors.age && <span>{errors.age}</span>}
    
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    );
}
```

## Utilities

### `FeedbackManager`

The **FeedbackManager** class is a centralized utility for managing feedback notifications - specifically toasts and alerts, with features like auto-dismissal, customizable durations, and fade-out animations. It follows a subscription-based model, making it easy to integrate with UI components for real-time feedback updates.

### Features

- **Supports Feedback Types:** "toast" and "alert".
- **Visual Variants:** "info", "success", "error", and "warning".
- **Auto-Dismiss Functionality:** Configurable durations for automatic dismissal of feedback.
- **Fade-Out Animations:** Handles graceful removal with fade-out effects.
- **Subscription Model:** Provides real-time updates to registered listeners.
- **UI Integration:** Works seamlessly with the FeedbackContainer component for rendering feedback notifications.

### API Documentation

#### Types

```typescript
type FeedbackVariant = "info" | "success" | "error" | "warning";

// Represents a single feedback notification.
interface Feedback {
    id: number;
    message: string;
    type: "toast" | "alert";
    variant: FeedbackVariant;
    autoDismiss?: boolean;
    duration?: number;
    onClose?: () => void;
    isFadingOut: boolean;
}

// Optional configuration for the addFeedback method.
interface FeedbackOptions = {
    type?: "toast" | "alert"; // Type of feedback (default: "toast")
    variant?: FeedbackVariant; // Visual variant (default: "info")
    autoDismiss?: boolean; // Whether the feedback should dismiss automatically (default: true)
    duration?: number; // Duration in milliseconds for auto-dismissal (default: 5000ms)
    onClose?: () => void; // Callback executed when the feedback is removed
}
```

#### Methods

#### `addFeedback(message: string, options?: FeedbackOptions): void`

Adds a new feedback notification to the list.

##### Parameters

- `message: string` - The feedback message to display.
- `options: FeedbackOptions` - Optional configuration object

#### `removeFeedback(id: number): void`

Removes feedback immediately and triggers its onClose callback, if provided.

##### Parameters

- `id: number`: Unique identifier of the feedback to be removed.

#### `subscribe(listener: (feedbacks: Feedback[]) => void): () => void`

Registers a listener for real-time feedback updates.

##### Parameters

- `listener: (feedbacks: Feedback[]) => void`: Callback function invoked with the current list of feedbacks.

##### Returns

A function to unsubscribe the listener.

#### Internal Methods

#### `startFadeOut(id: number): void`

Initiates the fade-out animation for a feedback notification before removing it.

#### `notifyListeners(): void`

Notifies all registered listeners of feedback updates.

#### Usage

##### Mounting the FeedbackContainer

The `FeedbackContainer` component listens for updates and renders feedback notifications appropriately. Add it once to your application, typically in your app's root component.

```tsx
import { FeedbackContainer } from 'react-fatless-form';

function App() {
  return (
    <div>
      <YourMainContent />
      <FeedbackContainer />
    </div>
  );
}
```

**FeedbackContainer** uses `ReactDOM.createPortal` to render notifications at the root of `document.body`.

##### Importing and Instantiating

```typescript
import { feedbackManager } from 'react-fatless-form';
```

###### Adding Feedback

```typescript
feedbackManager.addFeedback("Operation successful!", {
  type: "toast",
  variant: "success",
  autoDismiss: true,
  duration: 5000,
  onClose: () => console.log("Feedback closed!"),
});
```

###### Subscribing to Feedback Updates

```typescript
const unsubscribe = feedbackManager.subscribe(feedbacks => {
  console.log("Current feedbacks:", feedbacks);
});

// Unsubscribe when no longer needed
unsubscribe();
```

###### Example Integration with UI

```tsx
import { feedbackManager } from 'react-fatless-form';

const App = () => {
  const handleClick = () => {
    feedbackManager.addFeedback("This is a success message!", {
      type: "toast",
      variant: "success",
      duration: 3000,
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Show Feedback</button>
      <FeedbackContainer />
    </div>
  );
};
```

#### Example usage

```tsx
import { FormProvider, useForm, feedbackManager } from "react-fatless-form";

function MyForm() {
    const { 
      validate, 
      values, 
      errors,
      updateSubmissionStatus, 
      resetForm, 
      resetSubmissionStatus,
      setFieldValue,
      setFieldTouched,
    } = useForm({ username: "", age: 0 });

    const validateFn = values => {
        const errors = {};
        if (!values.username) errors.username = "Username is required";
        if (values.age <= 0) errors.age = "Age must be positive";
        return errors;
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        
        if (!validate(() => validateFn(values))) {
            console.warn("Validation failed");
            return;
        }
        
        updateSubmissionStatus("submitting");
        
        try {
            await apiCall(values);
            updateSubmissionStatus("success");
            
            feedbackManager.addFeedback("Submission successful!", {
                type: "toast",
                variant: "success",
                autoDismiss: true,
                duration: 5000,
                onClose: () => console.log("Feedback closed!"),
            });
            
            resetForm();
        } catch (error) {
            console.error("Error during submission:", error);
            updateSubmissionStatus("error");
            
            feedbackManager.addFeedback("That didn't go well!", {
                type: "toast",
                variant: "error",
                autoDismiss: true,
                duration: 5000,
                onClose: () => console.log("Feedback closed!"),
            });
        } finally {
            resetSubmissionStatus();
        }
    };

    return (
        <FormProvider form={form}>
            <form onSubmit={onSubmit}>
                <input
                    name="username"
                    value={values.username}
                    onChange={(e) => setFieldValue("username", e.target.value)}
                    onBlur={() => setFieldTouched("username", true)}
                />
                {errors.username && <span>{errors.username}</span>}
    
                <input
                    name="age"
                    type="number"
                    value={values.age}
                    onChange={(e) => setFieldValue("age", parseInt(e.target.value, 10))}
                    onBlur={() => setFieldTouched("age", true)}
                />
                {errors.age && <span>{errors.age}</span>}
    
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    );
}
```

#### Notes

- The `FeedbackManager` is a singleton instance provided by the `react-fatless-form` package.
- To display feedback notifications, ensure the `FeedbackContainer` component is mounted in your application - typically in your app's root component.
- Fade-out animations provide a smooth user experience and are automatically handled before feedback removal.

### `validateSchema`

The `validateSchema` utility function is a simple and efficient tool for validating form values against a schema defined using the [yup] validation library. It provides a structured way to collect validation errors, making it easy to integrate with form handling workflows.

### API Documentation

#### Signature

```typescript
export function validateSchema<T>(
    schema: yup.ObjectSchema<T>, 
    values: T
): Record<string, string>
```

#### Parameters

#### `schema: yup.ObjectSchema<T>`

**Description:** The validation schema defining the rules for the form fields. This is a yup object schema tailored to the structure of the values being validated.

**Type:** `yup.ObjectSchema<T>` (generic type representing the shape of the values)

#### `values: T`

**Description:** The object containing the form field values to be validated against the schema.
**Type:** `T` (generic type matching the schema shape)

#### Return value

**Type:** `Record<string, string>` (generic type matching the schema shape)
**Description:** An object containing validation errors. Each key represents the name of an invalid field, and its value is the corresponding error message. If no validation errors are found, an empty object is returned (`{}`).

#### Behavior

##### Validation Process

- The `validateSchema` function uses the schema.validateSync() method from yup to perform validation.
- The `abortEarly: false` option ensures all errors are collected, not just the first one.

##### Error Handling

- If the validation fails, the errors are collected from the inner property of the `yup.ValidationError` object.
- The errors are returned as a flat object, where each field’s name is mapped to its corresponding error message.

### Example usage

```tsx
import * as yup from "yup";
import { FormProvider, useForm, feedbackManager, validateSchema } from "react-fatless-form";

// Define a schema
const schema = yup.object({
    username: yup.string().required("Name is required"),
    age: yup.number().min(18, "Must be at least 18").required("Age is required"),
});

function MyForm() {
    const { 
      validate, 
      values,
      errors,  
      updateSubmissionStatus, 
      resetForm, 
      resetSubmissionStatus,
      setFieldValue,
      setFieldTouched,
    } = useForm({ username: "", age: 0 });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        
        if (!validate(() => validateSchema(schema, values))) {
            console.warn("Validation failed");
            return;
        }
        
        updateSubmissionStatus("submitting");
        
        try {
            await apiCall(values);
            updateSubmissionStatus("success");
            
            feedbackManager.addFeedback("Submission successful!", {
                type: "toast",
                variant: "success",
                autoDismiss: true,
                duration: 5000,
                onClose: () => console.log("Feedback closed!"),
            });
            
            resetForm();
        } catch (error) {
            console.error("Error during submission:", error);
            updateSubmissionStatus("error");
            
            feedbackManager.addFeedback("That didn't go well!", {
                type: "toast",
                variant: "error",
                autoDismiss: true,
                duration: 5000,
                onClose: () => console.log("Feedback closed!"),
            });
        } finally {
            resetSubmissionStatus();
        }
    };

    return (
        <FormProvider form={form}>
            <form onSubmit={onSubmit}>
                <input
                    name="username"
                    value={values.username}
                    onChange={(e) => setFieldValue("username", e.target.value)}
                    onBlur={() => setFieldTouched("username", true)}
                />
                {errors.username && <span>{errors.username}</span>}
    
                <input
                    name: "age"
                    type="number"
                    value={values.age}
                    onChange={(e) => setFieldValue("age", parseInt(e.target.value, 10))}
                    onBlur={() => setFieldTouched("age", true)}
                />
                {errors.age && <span>{errors.age}</span>}
    
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    );
}
```

### `handleSubmit`

The `handleSubmit` utility simplifies form submissions in React applications by integrating schema-based validation, submission status management, and optional feedback notifications. Designed to work seamlessly with the `useForm` hook, it reduces boilerplate code and enforces best practices for managing the form lifecycle.

### Features

- **Schema-Based Validation:** Ensures form data adheres to a defined structure using [yup].
- **Submission Status Updates:** Automatically updates form status ("submitting", "success", "error") for improved user feedback and state management.
- **Feedback Notifications:** Optional toast notifications for submission success or error states.
- **Flexible Feedback Control:** Allows developers to enable or disable default feedback handling for custom solutions.
- **Promise-Based API:** Fully compatible with async/await for smooth integration.

### API Documentation

#### Signature

```typescript
function handleSubmit<T>(
    form: ReturnType<typeof useForm<T>>, 
    schema: yup.ObjectSchema<T>, 
    onSubmit: (values: T) => Promise<void>, 
    successMessage?: string, 
    showFeedback?: boolean
): Promise<void>
```

#### Parameters

- `form: ReturnType<typeof useForm<T>>` - The form object returned by the useForm hook.
- `schema: yup.ObjectSchema<T>` - A yup schema defining the structure and constraints of form values.
- `onSubmit: (values: T) => Promise<void>` - An async callback for form submission logic. Receives validated form values as an argument.
- `successMessage?: string` - A success message displayed upon successful submission. Defaults to "Done!".
- `showFeedback?: boolean` - Controls whether feedback notifications are displayed. Defaults to true.

#### Returns

`Promise<void>` - Resolves when the submission process is complete.

#### Usage

##### Schema Definition with yup

```tsx
import * as yup from "yup";
import { useForm, feedbackManager, validateSchema } from "react-fatless-form";

// Define a schema
const schema = yup.object({
    username: yup.string().required("Name is required"),
    age: yup.number().min(18, "Must be at least 18").required("Age is required"),
});
```

##### Basic Integration

```tsx
import { useForm, handleSubmit } from 'react-fatless-form';

const form = useForm({ username: "", age: 0 });

const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    
    await handleSubmit(
        form,
        schema,
        async (values) => {
            const result = await api.submitData(values);
            if (!result.ok) throw result; // Ensure errors are thrown for handleSubmit to catch
        },
        "Submission successful!"
    );
};
```

##### Disabling Feedback

```tsx
import { useForm, feedbackManager } from 'react-fatless-form';

const form = useForm({ username: "", age: 0 });

const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    
    await handleSubmit(
        form,
        schema,
        async (values) => {
            const result = await api.submitData(values);
            if (!result.ok) {
                throw result; // Ensure errors are thrown for handleSubmit to catch
            }
        },
        "Submission successful!",
        false // Disable default feedback
    );

    // Custom feedback handling
    feedbackManager.addFeedback("Submission successful!", {
        type: "toast",
        variant: "success",
        autoDismiss: true,
        duration: 5000,
        onClose: () => form.resetSubmissionStatus(),
    });
};
```

#### Best Practices

##### Resetting Submission Status

When feedback is disabled, ensure that the form’s submission status is reset to "idle" after a submission. This avoids issues with multiple uses of `useForm`.

```typescript
form.resetSubmissionStatus();
```

##### Custom Feedback

Leverage `feedbackManager` or your own UI for personalized user feedback. The flexibility of disabling `showFeedback` empowers developers to craft unique experiences while adhering to state management requirements.

#### Example usage

```tsx
import * as yup from "yup";
import { FormProvider, useForm, handleSubmit } from "react-fatless-form";

// Define a schema
const schema = yup.object({
    username: yup.string().required("Name is required"),
    age: yup.number().min(18, "Must be at least 18").required("Age is required"),
});

function MyForm() {
    const form = useForm({ username: "", age: 0 });

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        
        await handleSubmit(
            form,
            schema,
            async (values) => {
                const result = await api.submitData(values);
                if (!result.ok) throw result; // Ensure errors are thrown for handleSubmit to catch
            },
            "Submission successful!"
        );
    };

    return (
        <FormProvider form={form}>
            <form onSubmit={onSubmit}>
                <input
                    name="username"
                    value={form.values.username}
                    onChange={(e) => setFieldValue("username", e.target.value)}
                    onBlur={() => setFieldTouched("username", true)}
                />
                {form.errors.username && <span>{form.errors.username}</span>}
    
                <input
                    name="age"
                    type="number"
                    value={form.values.age}
                    onChange={(e) => setFieldValue("age", parseInt(e.target.value, 10))}
                    onBlur={() => setFieldTouched("age", true)}
                />
                {form.errors.age && <span>{form.errors.age}</span>}
    
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    );
}
```

#### Why Choose `handleSubmit`?

- **Reduced Boilerplate:** Automates validation, submission status updates, and feedback management.
- **Flexibility:** Customize feedback or rely on built-in options.
- **Best Practices:** Encourages clean, predictable form handling with clear state transitions.

## The `Input` component ✨

The `Input` component is a versatile form control that dynamically renders different input types based on the `type` prop. It integrates seamlessly with form state management, automatically binding to form fields and handling state, validation, and styling. The component integrates seamlessly with form state management, automatically handling `value` and `onChange` props. This allows developers to focus solely on providing the necessary configurations without worrying about manually managing state.

### Supported Input Types

- **Text-based Inputs**: Includes `text`, `number`, `password`, etc.
- **Textarea**: Multi-line text input with options for rows, columns, and wrapping.
- **Checkbox**: Supports both standalone checkboxes and grouped checkboxes.
- **Radio Buttons**: Renders a group of mutually exclusive options.
- **Select Dropdown**: A dropdown menu with options for single or multiple selection.
- **Date Picker**: Renders a date input with optional minimum and maximum date constraints.
- **File Input**: For uploading files, with support for specifying file types and allowing multiple file uploads.

### Key Features

- **Dynamic Rendering**: Automatically renders the correct form control based on the `type` prop.
- **Type-Safe Props**: Each input type enforces its own specific props, ensuring valid usage.
- **Styling Options**: Supports `className` and `style` props for customization.

#### Common Props

| Prop            | Type                                   | Description                                                                                       |
|------------------|----------------------------------------|--------------------------------------------------------------------------------------------------|
| `name`        | `string` (required)                                    | The name of the input field, used for form state binding.                           |
| `label`      | `string` (required)                        | The label text displayed for the input field. |
| `disabled`      | `boolean` (optional)         | Disables the input field if true.          |
| `required`| `boolean` (optional)                               | Marks the input field as required.                     |
| `className` | `string` (optional) |Adds custom CSS classes to the input field for styling.|
| `style` | `React.CSSProperties` (optional) | Adds inline styles for the input field. |

#### Type-Specific Props

##### Text Inputs (type: "text" | "number" | "password")

| Prop            | Type                                   | Description                                                                                      |
|------------------|----------------------------------------|--------------------------------------------------------------------------------------------------|
| `placeholder`        | `string`                                   | Placeholder text for the input.                   |
| `autofocus`      | `boolean`                        | Automatically focuses the input field on mount. |

##### Textarea (type: "textarea")

| Prop            | Type                                   | Description                                                                                      |
|------------------|----------------------------------------|--------------------------------------------------------------------------------------------------|
| `cols`        | `number`                                   | Number of columns for the textarea.                   |
| `rows`      | `number`                        | Number of rows for the textarea. |
| `wrap` | `string`| "hard" or "soft" - Specifies how the text in a text area is to be wrapped when submitted in a form|
| `readonly` | `boolean` | Prevents modification of the text if true. |
| `maxlength` | `number` | Maximum number of characters allowed. |

##### Checkbox (type: "checkbox")

| Prop            | Type                                   | Description                                                                                      |
|------------------|----------------------------------------|--------------------------------------------------------------------------------------------------|
| `checked`        | `boolean`                                   | Indicates if the checkbox is selected.               |
| `options`      | `{ label: string; value: any }[]`                        | Array of checkbox options for grouped checkboxes. |
| `slider` | `string` | "rounded" or "default" - If provided, renders a single checkbox as a switch. "default" renders a rounded switch. "rounded" renders a rounded switch. |

##### Behavior

###### Single Checkbox

- If `options` is not provided, it renders a single checkbox.
- If `slider` is provided, the checkbox is styled as a switch.

###### Multiple Checkboxes

- If `options` is provided and has at least one item, it renders a list of checkboxes. 
- If `options` is empty, the component renders nothing.

##### Radio Buttons (type: "radio")

| Prop            | Type                                   | Description                                                                                      |
|------------------|----------------------------------------|--------------------------------------------------------------------------------------------------|
| `checked`        | `boolean`                                   | Indicates if the checkbox is selected.               |
| `options`      | `{ label: string; value: any }[]`                        | Array of radio button options. |

##### Select Dropdown (type: "select")

| Prop            | Type                                   | Description                                                                                      |
|------------------|----------------------------------------|--------------------------------------------------------------------------------------------------|
| `options`        | `{ label: string; value: any }[]`                                   | Array of dropdown options.               |
| `loading`      | `boolean`                        | Displays a loading indicator if true. |
| `multiple` | `boolean` |  Enables multi-selection if `true`. |
| `placeholder` | `string` | Placeholder text for the dropdown. |

##### Date Input (type: "date")

| Prop            | Type                                   | Description                                                                                      |
|------------------|----------------------------------------|--------------------------------------------------------------------------------------------------|
| `minDate`        | `Date`                                   | Minimum selectable date.               |
| `maxDate`      | `Date`                        | Maximum selectable date. |
| `placeholder` | `string` | Placeholder text for the date input. |

##### File Input (type: "file")

| Prop            | Type                                   | Description                                                                                      |
|------------------|----------------------------------------|--------------------------------------------------------------------------------------------------|
| `accept`        | `string`                                   | Accepted file types (e.g., .pdf, .docx).               |
| `multiple`      | `boolean`                        | Allows selection of multiple files if true. |

### Examples

#### 1. Text Input

```tsx
<Input name="username" type="text" label="Username" placeholder="Enter your username" />
```

#### 2. Single Checkbox (Default)

```tsx
<Input
    name="acceptTerms"
    type="checkbox"
    label="Accept Terms and Conditions"
/>
```

#### 3. Single Checkbox (Slider)

```tsx
<Input
    name="darkMode"
    type="checkbox"
    label="Enable Dark Mode"
    slider="rounded"
/>
```

#### 4. Multiple Checkboxes

```tsx
<Input
    name="preferences"
    type="checkbox"
    label="Choose Preferences"
    options={[
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
    ]}
/>
 ```

#### 5. Date Input

```tsx
    <Input
        name="preferredDate"
        type="date"
        minDate={new Date()} // Restrict to no past dates
        maxDate={new Date(2025, 11, 31)} // Allow dates only up to Dec 31, 2025
        className="custom-date-input" // Add custom styling to the input field
    />
```

#### 6. File Input

```tsx
<Input name="files" type="file" label="Relevant Files" accept=".pdf,.docx" multiple />
```

### Full Example (Recommended)

```tsx
import * as yup from "yup";
import { FormProvider, useForm, handleSubmit, Input } from "react-fatless-form";

// Define a schema
const schema = yup.object({
    username: yup
        .required("Name is required"),
    age: yup
        .number()
        .typeError("Age must be a number")
        .min(18, "Must be at least 18")
        .required("Age is required"),
    dateAvailable: yup
        .date()
        .typeError("Must be a valid date")
        .required("Availability date is required"),
    relevantFiles: yup
        .required("This field is required")
        .min(1, "At least one file must be availed")
        .test("fileType", "Invalid file type", (files) => {
            if (!files || files.length === 0) return true;
            return files
                .every((file) => ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"]
                .includes(file.type));
        })
        .test("fileSize", "File is too large", (files) => {
            if (!files || files.length === 0) return true;
            return files
                .every((file) => file.size <= 2 * 1024 * 1024); // Max 2MB
        }),
    preferredCountriesOfWork: yup
        .array()
        .of(yup
            .string()
            .typeError("Each item must be a string")
            .required("Country is required")
        )
        .min(1, "At least one country must be selected")
        .required("This field is required");
});

function MyForm() {
    const form = useForm({ 
        username: "", 
        age: 18, 
        dateAvailable: new Date(),
        relevantFiles: [],
        preferredCountriesOfWork: [],
    });

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        
        await handleSubmit(
            form,
            schema,
            async (values) => {
                const result = await api.submitData(values);
                if (!result.ok) throw result; // Ensure errors are thrown for handleSubmit to catch
            },
            "Submission successful!"
        );
    };

    return (
        <FormProvider form={form}>
            <form onSubmit={onSubmit}>
                <Input name="username" type="text" label="Username" placeholder="Your username" />
                <Input name="age" type="number" label="Age" placeholder="Your age" />
                <Input name="dateAvailable" type="date" label="Commencement Date" />
                <Input name="relevantFiles" type="file" label="Relevant files" accept=".doc,.docx" multiple />
                <Input name="preferredCountriesOfWork" type="select" label="Preferred Countries" options={[
                    {label: "Kenya", value: "ke"}
                    {label: "Ethiopia", value: "et"}
                    {label: "Nigeria", value: "ng"}
                    {label: "South Africa", value: "sa"}
                ]} placeholder="Select countries" multiple />
    
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    );
}
```

## Tech

`react-fatless-form` uses two open source projects to work properly:

- [React] - The library for web and native user interfaces
- [Yup] - A schema builder for runtime value parsing and validation.

## License

### MIT

I'm super chill about how you use this software, basically letting you do whatever you want with it, even for commercial purposes – it's the definition of open source freedom! Just be sure to include the provided license.

[Adera Henry], with :heart: from Nairobi, Kenya

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[React]: <https://react.dev/>
[yup]: <https://www.npmjs.com/package/yup>
[Adera Henry]: <https://www.linkedin.com/in/aderahenry/>
