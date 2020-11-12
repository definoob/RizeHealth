import React from 'react';
import { Link } from 'react-router-dom';

import NotFoundImage from '../../assets/404.jpg';

function NotFoundPage (params) {
	return (
		<div>
			<img src={NotFoundImage} alt='' style={{ display: 'block', margin: 'auto' }} />
			<p style={{ textAlign: 'center' }}>
				<Link to='/'>Go to Home </Link>
			</p>
		</div>
	);
}

export default NotFoundPage;
