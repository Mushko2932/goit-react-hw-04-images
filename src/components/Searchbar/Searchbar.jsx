import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Header, Form, Field, FormBtn, FormLabel } from './SearchBar.styled';

const state = {
  search: '',
};

export const SearchBar = ({ onSubmit }) => {
  const handleSabmit = async (e, actions) => {
    await onSubmit(e.search);
    actions.setSubmitting(false);
    actions.resetForm();
  };
  return (
    <Header>
      <Formik initialValues={state} onSubmit={handleSabmit}>
        {({ isSubmitting }) => (
          <Form>
            <FormBtn type="submit" disabled={isSubmitting}>
              <FormLabel>Search</FormLabel>
            </FormBtn>

            <Field
              name="search"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </Form>
        )}
      </Formik>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
