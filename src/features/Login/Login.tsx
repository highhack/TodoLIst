import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {loginTC} from './auth-reducer'
import {AppRootStateType} from '../../app/store'
import { Redirect } from 'react-router-dom'

export const Login = () => {
    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }

        },
        initialValues: {
            email: 'dailinet10@gmail.com',
            password: 'test',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(loginTC(values));
        },
    })

    if (isLoggedIn) {
        return <Redirect to={"/"} />
    }


    return <Grid container justify="center">
        <Grid item xs={4} style={{margin: '10%'}}>
            <form onSubmit={formik.handleSubmit} >
                <FormControl>
                    <FormLabel>
                        <p>
                            To log in get registered <a href={'https://social-network.samuraijs.com/'}
                                                        rel="noopener noreferrer"
                                                        target={'_blank'}>here</a>
                        </p>
                        <p>
                            or use common test account credentials:
                        </p>
                        <p> Email: dailinet@gmail.com
                        </p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            variant='filled'
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField
                            variant='filled'
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps("rememberMe")}
                                checked={formik.values.rememberMe}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
