import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import "../../node_modules/react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';

function Todo(props) {
	const [Todo, setTodo] = useState({ isDone: false, name: "", priority: 10, startDate: new Date(), deadLine: new Date() });
	const [showUpdate, setShowUpdate] = useState(false);

	useEffect(() => {
		// console.log(props);
		setTodo(props.TODO);
	}, [props]);

	useEffect(() => {
		// console.log ("compare", Todo, props.TODO);
		// https://stackoverflow.com/a/37396358/11587347
		let diff = Object.keys(props.TODO).reduce((diff, key) => {
			if (Todo[key] === props.TODO[key]) return diff
			return {
				...diff,
				[key]: props.TODO[key]
			}
		}, {});
		// console.log ("diff", diff);
		// https://medium.com/@carlibotes/is-the-object-is-empty-afdabee326dc
		if (Object.keys(diff).length === 0 && diff.constructor === Object) {
			setShowUpdate(false);
		} else {
			setShowUpdate(true);
		}
	}, [Todo, props.TODO]);

	return (
		<div>
			<Container className="m-3">
				<input type="checkbox" checked={Todo.isDone} id="exampleCheck1" onChange={() => {
					setTodo({ ...Todo, isDone: !Todo.isDone });
				}} />
				<label>{`Mark ${Todo.isDone ? "UnDone" : "Done"}`}</label>
				<Row>
					<Col>
						<input type="text" defaultValue={Todo.name}  disabled={Todo.isDone} onChange={(event) => {
							setTodo({ ...Todo, name: event.target.value });
						}} />
					</Col>
					<Col>
						<input type="range" min="0" max="9" id="customRange1" defaultValue={Todo.priority - 1} disabled={Todo.isDone} onChange={(event) => {
							setTodo({ ...Todo, priority: Number(event.target.value) + 1 });
						}} />
					</Col>
				</Row>
				<Row>
					<Col>
						<Datetime value={new Date(Todo.startDate)} inputProps={{
							disabled: Todo.isDone,
						}} />
					</Col>
					<Col>
						<Datetime value={new Date(Todo.deadLine)} inputProps={{
							disabled: Todo.isDone,
						}} />
					</Col>
				</Row>
				<Button onClick={() => props.deleteEntry(props.index)}>
					Delete Todo
				</Button>
				{
					showUpdate && <Button onClick={() => {
						// var tmpTodo = props.TODO;
						// tmpTodo[props.index] = Todo;
						// props.setTodo(tmpTodo);
						props.updateEntry(Todo)
					}}>
						Update Todo
					</Button>
				}
			</Container>
		</div>
	)
}

export default Todo;
