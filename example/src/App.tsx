import React from 'react';
import * as yup from "yup";
import { IoCalendarNumberSharp, IoTimeSharp, IoEye, IoEyeOff } from "react-icons/io5";
import './App.css';

import { FormProvider, useForm, handleSubmit, Input, FeedbackContainer, feedbackManager } from "react-fatless-form";

const schema = yup.object({
  username: yup
    .string()
    .required("Username is required"),
  age: yup
      .number()
      .typeError("Age must be a number")
      .min(18, "Must be at least 18")
      .required("Age is required"),
  dateAvailable: yup
      .date()
      .typeError("Must be a valid date")
      .required("Availability date is required"),
  quittingTime: yup.string().required("Time is required"),
  password: yup.string().required("Password is required"),
  relevantFiles: yup
      .array()
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
      .required("This field is required")
});

function App() {
  const form = useForm<{ 
    username: string; 
    age: number; 
    dateAvailable?: Date;
    quittingTime?: string;
    password?: string,
    relevantFiles: File[];
    preferredCountriesOfWork: string[];
  }>({ 
    username: "", 
    age: 18, 
    dateAvailable: undefined,
    quittingTime: undefined,
    password: "",
    relevantFiles: [],
    preferredCountriesOfWork: [],
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      
      await handleSubmit(
          form,
          schema,
          async (values) => {
              console.log(values);
              return { message: "Form submitted successfully" };
          },
      );
  };

  const resetClickHandler = () => {
    form.resetForm();
    feedbackManager.addFeedback("Form was reset", { type: "alert", autoDismiss: true }); // <=== Feedback of type "alert"
  };

  return (
    <>
    <div className="App">
      <FormProvider form={form}>
          <form onSubmit={onSubmit}>
              <Input name="username" type="text" label="Username" placeholder="Your username" />
              <Input name="age" type="number" label="Age" placeholder="Your age" />
              <Input name="dateAvailable" type="date" label="Date Available" minDate={new Date} timePicker minTime='08:00' maxTime='16:30' dateFormat='MMMM dd, yyyy' noWeekends rightIcon={<IoCalendarNumberSharp color='#ccc' />} />
              <Input name="quittingTime" type="time" label="Quitting time" minTime="3:00 PM" maxTime="4:30 PM" rightIcon={<IoTimeSharp color='#ccc' />} />
              <Input name="preferredCountriesOfWork" type="select" label="Preferred Countries" options={[
                  {label: "Kenya", value: "ke"},
                  {label: "Ethiopia", value: "et"},
                  {label: "Nigeria", value: "ng"},
                  {label: "South Africa", value: "sa"}
              ]} placeholder="Select countries" multiple />
              <Input name="password" type="password" label="Password" placeholder="Password" showIcon={<IoEye color='#ccc' />} hideIcon={<IoEyeOff color='#ccc' />} />
              <Input name="relevantFiles" type="file" label="Relevant files" accept=".doc,.docx" multiple />

              <button className="submitButton" type="submit">Submit</button>
              <button className="resetButton" type="reset" onClick={resetClickHandler}>Reset</button>
          </form>
      </FormProvider>
    </div>
    <FeedbackContainer />
    </>
  );
}

export default App;
