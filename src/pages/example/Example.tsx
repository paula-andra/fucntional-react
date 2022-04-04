import { VFC, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import { Row } from '../../components/Row';

import { Timer } from './components/Timer';
import { Counter } from './components/Counter';
import { List } from './components/List';
import { Components } from './components/Components';
import { ContextExample } from './components/ContextExample/ContextExample';
import { UserProfileProvider } from './components/ContextExample/UserProfileContext';

const ParamsComponent: VFC = () => {
  const params = useParams();
  return <Row>Id: {params.id}</Row>;
};

export const Example: VFC = () => {

  const [initialValue, setInitialValue] = useState(1);
  const [increment, setIncrement] = useState(3);
  const [startSeconds, setStartSecond] = useState(0);

  return <Routes>
    <Route path={''}
           element={<>
             <Row><Link to={'components'}> Components</Link></Row>
             <Row><Link to={'counter'}> Counter</Link></Row>
             <Row><Link to={'timer'}> Timer</Link></Row>
             <Row><Link to={'list'}> List</Link></Row>
             <Row><Link to={'context-example'}> Context example</Link></Row>
           </>}/>

    <Route path={`components`} element={<Components/>}/>
    <Route path={`counter`} element={
      <>
        <Row>
          <button onClick={() => setStartSecond(currentValue => currentValue + 10)}> Increase starting seconds for timer
          </button>
        </Row>
        <Counter initialValue={initialValue} increment={increment}/>
      </>
    }/>

    <Route path={`list`} element={<List/>}/>

    <Route path={`timer`} element={<>
      <Row>
        <button onClick={() => setInitialValue((currentValue) => currentValue + 1)}>Increase initial value for counter
        </button>
        <button onClick={() => setIncrement((currentValue) => currentValue + 1)}>Increase increment for counter</button>
      </Row>
      <Timer startSeconds={startSeconds}/>
    </>}/>
    <Route path={`context-example`} element={<UserProfileProvider><ContextExample/></UserProfileProvider>}/>
    <Route path={`:id`} element={<ParamsComponent/>}/>

  </Routes>;
};