import { Formik, Field, Form } from 'formik'
import clsx from 'clsx'

import { PrimaryButton } from '..'

interface Values {
  firstName: string
  lastName: string
  title: string
  institution: string
  email: string
  city: string
  country: string
  zip: string
  bio: string
  twitter: string
  agree: string
  emailUpdates: boolean
}

const LetterForm = () => {
  const styles = {
    field:
      'border border-black bg-lightBlue px-6 py-2.5 text-base font-light mb-5',
    label: 'text-base font-light mb-1.5',
    checkbox:
      'rounded-sm border border-black checked:bg-black bg-clementine/20',
  }
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        title: '',
        institution: '',
        email: '',
        city: '',
        country: '',
        zip: '',
        bio: '',
        twitter: '',
        agree: '',
        emailUpdates: true,
      }}
      onSubmit={(values: Values) => {
        console.log(values)
      }}
    >
      <Form>
        {/* TODO: accessibility concerns of no label */}
        <div className="flex space-x-4">
          <Field
            id="firstName"
            name="firstName"
            placeholder="First"
            className={clsx('w-full', styles.field)}
          />
          <Field
            id="lastName"
            name="lastName"
            placeholder="Last"
            className={clsx('w-full', styles.field)}
          />
        </div>
        <Field
          id="title"
          name="tile"
          placeholder="Title"
          className={clsx('w-full', styles.field)}
        />
        <Field
          id="institution"
          name="institution"
          placeholder="Institution"
          className={clsx('w-full', styles.field)}
        />
        <Field
          id="email"
          name="email"
          placeholder="Email*"
          type="email"
          className={clsx('block', styles.field)}
        />
        <Field
          id="city"
          name="city"
          placeholder="City"
          className={clsx('block', styles.field)}
        />
        <Field
          id="country"
          name="country"
          placeholder="Country"
          className={clsx('block', styles.field)}
        />
        <Field
          id="zip"
          name="zip"
          placeholder="Zip/Postal Code"
          className={clsx('block', styles.field)}
        />
        <label className={styles.label} htmlFor="bio">
          Link to Bio, University Webpage, Etc.
        </label>
        <Field
          id="bio"
          name="bio"
          placeholder="Link Here"
          className={clsx('block', styles.field)}
        />
        <label className={styles.label} htmlFor="bio">
          Twitter Handle
        </label>
        <Field
          id="twitter"
          name="twitter"
          placeholder="Link Here"
          className={clsx('block', styles.field)}
        />
        <div>
          <p className="mb-2 w-3/4 text-base">
            I TESTIFY THAT THE INFORMATION I HAVE SUPPLIED ON THIS FORM IS TRUE
            AND ACCURATELY REFLECTS MY IDENTITY, AS WELL AS DESIRE TO SIGN THE
            FOSSIL FREE UIUC LETTER.
          </p>
          <label className="mb-2.5 block text-base">
            <Field
              type="radio"
              name="agree"
              value="YES"
              className={clsx('ml-1 mr-7 ', styles.checkbox)}
            />
            YES
          </label>
          <label className="mb-2.5 block text-base">
            <Field
              type="radio"
              name="agree"
              value="NO"
              className={clsx('ml-1 mr-7 ', styles.checkbox)}
            />
            NO
          </label>
        </div>
        <div className="flex flex-col items-center">
          <PrimaryButton
            text="Add Your Name"
            variant="clementine"
            className="mb-5 mt-2.5 !px-14 py-2"
            type="submit"
          />
          <label className="text-base">
            <Field
              type="checkbox"
              name="emailUpdates"
              className={clsx('mr-4', styles.checkbox)}
            />
            Opt in to email updates from TORIIS
          </label>
        </div>
      </Form>
    </Formik>
  )
}

export default LetterForm