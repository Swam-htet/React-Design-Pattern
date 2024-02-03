// props rendering pattern

import React from 'react';

export default function RenderPattern() {
    let [name, setName] = React.useState('');
    let setStateHandler = (value) => {
        setName(value);
    }

    return (
        <div>
            <h1>Render Pattern</h1>
            {/*<Title render={() => <h2>Render Pattern by Title render</h2>}/>*/}

            {/*<Header>*/}
            {/*    {() => <h2>Render Pattern by Header children</h2>}*/}
            {/*</Header>*/}

            <h3>This is Name : {name}</h3>

            <CustomInput
                state={name}
                stateChangeHandler={setStateHandler}
                name="name"
            >
                {(value, onChangeHandler, name) => (
                    <input
                        onChange={onChangeHandler}
                        value={value}
                        type="text"
                        placeholder={`Enter your ${name}`}
                    />
                )}
            </CustomInput>

        </div>
    );
}

// using render props method
// let Title = (props) => props.render();
//
// let Header = (props) => props.children();

// how to pass value, onChangeHandler to input
let CustomInput = ({children, name, state, stateChangeHandler}) => {
    let onChangeHandler = (e) => {
        console.log(e.target.value);
        stateChangeHandler(e.target.value);
    };
    return children(state, onChangeHandler, name);
};

// example of using Render Pattern in Formik
/*
<Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    })}
    onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    }}
    >
    // how it work? - render props method
    {formik => (
        <Form>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" />
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={formik.isSubmitting}>
                Submit
            </button>
        </Form>
    )}
    </Formik>
 */



