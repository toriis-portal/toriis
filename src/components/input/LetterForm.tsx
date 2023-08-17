import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'

import { PrimaryButton } from '..'
import { api } from '../../utils/api'

interface Values {
  firstName: string
  lastName: string
  title: string
  institution: string
  email: string
  city: string
  country: string
  zip?: number
  bio: string
  twitter: string
  agree: string
  emailUpdates: boolean
}

const LetterForm = () => {
  const addSignatoryMutation = api.signatory.addSignatory.useMutation()

  const styles = {
    field:
      'border border-black bg-lightBlue px-6 py-2.5 text-base font-light mb-5',
    label: 'text-base font-light mb-1.5',
    checkbox:
      'rounded-sm border border-black checked:bg-black bg-clementine/20',
  }

  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email required'),
    agree: Yup.string()
      .oneOf(['YES'], 'Please agree to sign the letter')
      .required('Please agree to sign the letter'),
    firstName: Yup.string().required('First and last name required'),
    lastName: Yup.string().required('First and last name required'),
  })

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
        bio: '',
        twitter: '',
        agree: '',
        emailUpdates: true,
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values: Values) => {
        console.log(values)
        addSignatoryMutation.mutate({
          firstName: values.firstName,
          lastName: values.lastName,
          // TODO: use FieldArrays, conditional rendering for addtl fields and a max number of titles for this. temporarily just taking one title/institution pair
          title: [values.title],
          institution: [values.title],
          email: values.email,
          city: values.city,
          country: values.country,
          zipCode: values.zip ?? 0,
          bioLink: values.bio,
          twitter: values.twitter,
          shouldEmail: values.emailUpdates,
        })
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          {/* TODO: accessibility concerns of no label */}
          <div className="sm:flex sm:space-x-4">
            <Field
              id="firstName"
              name="firstName"
              placeholder="First"
              className={clsx(
                'w-full',
                styles.field,
                errors.email && touched.email && '!mb-2 ',
              )}
            />
            <Field
              id="lastName"
              name="lastName"
              placeholder="Last"
              className={clsx(
                'w-full',
                styles.field,
                errors.email && touched.email && '!mb-2 ',
              )}
            />
          </div>
          {(errors.firstName && touched.firstName) ||
          (errors.lastName && touched.lastName) ? (
            <div className="mb-5 text-red-700">
              {errors.firstName ?? errors.lastName}
            </div>
          ) : null}
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
            className={clsx(
              'w-full sm:block',
              styles.field,
              errors.email && touched.email && '!mb-2 ',
            )}
          />
          {errors.email && touched.email ? (
            <div className="mb-5 text-red-700">{errors.email}</div>
          ) : null}
          <Field
            id="city"
            name="city"
            placeholder="City"
            className={clsx('w-full sm:block', styles.field)}
          />
          <Field
            id="country"
            name="country"
            placeholder="Country"
            className={clsx('w-full sm:block', styles.field)}
          />
          <Field
            id="zip"
            name="zip"
            placeholder="Zip/Postal Code"
            type="number"
            className={clsx('w-full sm:block', styles.field)}
            // This additional logic is required for zipcode field in order
            // to display string placeholder in a number field safely.
            onChangeText={(value: string) =>
              setFieldValue('zip', parseInt(value))
            }
          />
          <label className={styles.label} htmlFor="bio">
            Link to Bio, University Webpage, Etc.
          </label>
          <Field
            id="bio"
            name="bio"
            placeholder="Link Here"
            className={clsx('w-full sm:block', styles.field)}
          />
          <label className={styles.label} htmlFor="bio">
            Twitter Handle
          </label>
          <Field
            id="twitter"
            name="twitter"
            placeholder="Link Here"
            className={clsx('w-full sm:block', styles.field)}
          />
          <div>
            <p className="mb-2 w-full text-base sm:w-3/4">
              I TESTIFY THAT THE INFORMATION I HAVE SUPPLIED ON THIS FORM IS
              TRUE AND ACCURATELY REFLECTS MY IDENTITY, AS WELL AS DESIRE TO
              SIGN THE FOSSIL FREE UIUC LETTER.
            </p>
            {errors.agree && touched.agree ? (
              <div className="mb-5 text-red-700">{errors.agree}</div>
            ) : null}
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
          {addSignatoryMutation.error && (
            <p className="mt-5 text-red-700">
              {addSignatoryMutation.error.message ===
              'There is already a signatory with this email.'
                ? addSignatoryMutation.error.message
                : 'Sorry, there was an error submitting your signature - please contact info@toriis.earth.'}
            </p>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default LetterForm
