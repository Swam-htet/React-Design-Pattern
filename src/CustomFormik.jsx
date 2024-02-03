// custom formik component

import {useState} from "react";
import * as Yup from "yup";

// validation schema
const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required")
});

// custom formik component
export function CustomFormik({children, initialValues, onSubmit, validationSchema}) {
    let [values, setValues] = useState(initialValues);
    let [errors, setErrors] = useState([]);

    console.log("Error - ", errors);

    function inputHandler(name) {
        return function (e) {
            // console.log(`Name: ${name}, Value: ${e.target.value}`);
            setValues({...values, [name]: e.target.value});
        }
    }

    function onSubmitHandler(values) {
        // before submitting, check the input values with validation schema
        validationSchema.validate(values).then(() => {
            console.log("Validation Success");
            setErrors([]);
            onSubmit(values);
        }).catch(err => {
            console.log("Validation Error: ", err.errors);
            setErrors(err.errors);
        });
    }

    return (
        <>
            {
                children(values, inputHandler, onSubmitHandler)
            }

        </>
    )
}


// custom formik component
export default function CustomFormikTest() {
    return (
        <CustomFormik
            initialValues={{email: "testing", password: "testing"}}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log("Form Values: ", values);
            }}
        >
            {
                (values, inputHandler, onSubmit) => {
                    return (

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit(values)
                        }}>
                            <input type="text"
                                   name="email"
                                   value={values.email}
                                   onChange={inputHandler("email")}/>

                            <input type="password"
                                   name="password"
                                   value={values.password}
                                   onChange={inputHandler("password")}/>

                            <button type="submit">Submit</button>
                        </form>
                    )
                }
            }
        </CustomFormik>
    )
}