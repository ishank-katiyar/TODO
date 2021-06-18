import React from 'react';
import { Navbar, NavDropdown, Form, Container } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function nav({ sortByState, dispatch, SortByStates }) {
	return (
		<div>
			<Container>
				<Navbar sticky="top" bg="light" variant="light">
					<h3 className="m-auto text-bold">TODO APP </h3>
					{/* <NavDropdown title="Sort By" id="navbarScrollingDropdown" className="m-4">
						<div className="m-3">
							<Form.Check type="radio" label="Start Date" name="formHorizontalRadios" id="formHorizontalRadios1" onClick={() => dispatch({ type: SortByStates.StartDate })} defaultChecked={sortByState === SortByStates.StartDate} />
							<Form.Check type="radio" label="DeadLine" name="formHorizontalRadios" id="formHorizontalRadios2" onClick={() => dispatch({ type: SortByStates.DeadLine })} defaultChecked={sortByState === SortByStates.Deadline}/>
							<Form.Check type="radio" label="Priority Level" name="formHorizontalRadios" id="formHorizontalRadios3" onClick={() => dispatch({ type: SortByStates.Priority })} defaultChecked={sortByState === SortByStates.Priority}/>
						</div>
					</NavDropdown> */}
				</Navbar>
			</Container>
		</div>
	)
}
