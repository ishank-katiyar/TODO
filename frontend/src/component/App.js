import React, { useReducer, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Nav from './nav';
import Todo from './todo';
import "../../node_modules/react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
const config = require('../config/config');

const SortByStates = {
	StartDate: 'StartDate',
	DeadLine: 'DeadLine',
	Priority: 'Priority'
};

const SortByReducer = (state, action) => {
	switch (action.type) {
		case SortByStates.StartDate:
			console.log(SortByStates.StartDate);
			return { SortByState: SortByStates.StartDate };
		case SortByStates.DeadLine:
			console.log(SortByStates.DeadLine);
			return { SortByState: SortByStates.DeadLine };
		case SortByStates.Priority:
			console.log(SortByStates.Priority);
			return { SortByState: SortByStates.Priority };
		default:
			throw new Error('Undefined action.type')
	}
};

function App() {
	const initialNewTodoState = { isDone: false, name: "", priority: 10, startDate: new Date(), deadLine: new Date() };
	const [SortByState, dispatch] = useReducer(SortByReducer, { SortByState: SortByStates.DeadLine });
	const [TODO, setTODO] = useState([]);
	const [newTODO, setnewTODO] = useState(initialNewTodoState);

	useEffect(() => {
		RefreshData();
	}, []);

	useEffect(() => {
		console.log(SortByState);
	}, [SortByState]);

	useEffect(() => {
		console.log(newTODO);
	}, [newTODO]);

	// useEffect(() => {
	// 	var newTodos = TODO;
	// 	if (SortByState.SortByState === SortByStates.StartDate) {
	// 		newTodos.sort((a,b) => new Date(b.startDate) - new Date(a.startDate));
	// 	}
	// 	if (SortByState.SortByState === SortByStates.DeadLine) {
	// 		newTodos.sort((a,b) => new Date(b.deadLine) - new Date(a.deadLine));
	// 	}
	// 	if (SortByState.SortByState === SortByStates.Priority) {
	// 		console.log ("sorting by priority");
	// 		newTodos.sort((a,b) => (Number(a.priority) > Number(b.priority)) ? 1 : ((Number(b.priority) > Number(a.priority)) ? -1 : 0));
	// 	}
	// 	console.log ("After sort: ", newTodos);
	// 	setTODO(newTodos);
	// }, [SortByState, TODO]);

	const RefreshData = () => {
		axios
			.get(config.API_ENDPOINT + config.REFRESH)
			.then((value) => {
				console.log(value);
				setTODO(value.data);
			})
			.catch((err) => {
				console.log("Error occured while fetching TODO", err);
			})
	};

	const createNewTodo = () => {
		axios
			.post(config.API_ENDPOINT + config.CREATE_ENTRY, newTODO)
			.then((res) => {
				if (res.data === "Successfully created new entry !!" && res.status === 200) {
					setnewTODO(initialNewTodoState);
					RefreshData();
				}
			})
			.catch((err) => {
				console.log("error occured while creating new entry", err);
			})
	};

	const updateEntry = (Todo) => {
		console.log("updating of ", Todo);
		axios
			.post(config.API_ENDPOINT + config.UPDATE_ENTRY, Todo)
			.then((res) => {
				// console.log(res);
				RefreshData();
			})
			.catch((err) => {
				console.log("error occured while updating data", err);
			})
	}

	const deleteEntry = (idx) => {
		console.log("deleting of ", idx, TODO[idx]);
		axios
			.post(config.API_ENDPOINT + config.DELETE_ENTRY, TODO[idx])
			.then((res) => {
				// console.log(res);
				RefreshData();
			})
			.catch((err) => {
				console.log("error occured while deleting data", err);
			})
	}

	const TODOJSX = () => {
		if (Array.isArray(TODO) && TODO.length) {
			return TODO.map((todo, idx) => {
				// console.log(todo, idx);
				return (<Todo TODO={todo} updateEntry={updateEntry} deleteEntry={deleteEntry} key={idx} index={idx} setTodo={setTODO} />);
			})
		}
		return <></>;
	};

	return (
		<div>
			<Container>
				<Row>
					<Nav SortByState={SortByState} dispatch={dispatch} SortByStates={SortByStates} />
				</Row>
				<Row>
					{/* {
						Array.isArray(TODO) &&
						TODO.length &&
						TODO.map((todo, idx) => {
							console.log(todo, idx);
							return (<Todo TODO={todo} updateEntry={updateEntry} deleteEntry={deleteEntry} key={idx} />);
						})
					} */}
					{TODOJSX()}
				</Row>
				<Row className="m-5">
					<Form>
						<div>
							<h5>Create New TODO:-</h5>
						</div>
						<Row className="m-5">
							<label>Description :- </label>
							<input type="text" className="m-3 form-input" defaultValue={newTODO.name} onChange={(event) => {
								setnewTODO({
									...newTODO,
									name: event.target.value
								})
							}} />
							<div>
								<label>Priority :- </label>
							</div>
							<div>
								<input type="range" min="0" max="9" className="m-2 form-range" id="customRange1" defaultValue={newTODO.priority - 1} onChange={(event) => {
									setnewTODO({
										...newTODO,
										priority: Number(event.target.value) + 1,
									})
								}} />
							</div>
							<Row>
								<Col>
									<Datetime inputProps={{
										placeholder: "Start Date",
										onMouseLeave: (event) => {
											setnewTODO({
												...newTODO,
												startDate: new Date(event.target.value)
											})
										},
									}} value={new Date(newTODO.startDate)} />
								</Col>
								<Col>
									<Datetime inputProps={{
										placeholder: "Dead line",
										onMouseLeave: (event) => {
											setnewTODO({
												...newTODO,
												deadLine: new Date(event.target.value)
											})
										},
									}} value={new Date(newTODO.deadLine)} />
								</Col>
							</Row>
						</Row>
						<Button className="btn-secondary m-0" onClick={() => createNewTodo()}>New TODO</Button>
					</Form>
				</Row>
			</Container>
		</div>
	);
}

export default App;
