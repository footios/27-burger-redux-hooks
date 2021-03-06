import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Eject from '../Eject/Eject';

const withErrorHandler = (WrappedComponent, axios) => {
	return (props) => {
		const [ error, setError ] = useState(null);

		const reqInterceptor = axios.interceptors.request.use((req) => {
			setError(null);
			return req;
		});

		const resInterceptor = axios.interceptors.response.use(
			(res) => res,
			(err) => {
				setError(err);
			}
		);
		useEffect(
			() => {
				return () => {
					axios.interceptors.request.eject(reqInterceptor);
					axios.interceptors.request.eject(resInterceptor);
				};
			},
			[ reqInterceptor, resInterceptor ]
		);

		const errorConfirmedHandler = () => {
			setError(null);
		};
		return (
			<Eject>
				<Modal show={error} modalClosed={errorConfirmedHandler}>
					{error ? error.message : null}
				</Modal>
				<WrappedComponent {...props} />
			</Eject>
		);
	};
};

export default withErrorHandler;
