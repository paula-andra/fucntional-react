import { VFC, useState } from "react";

import { Row } from "../../../components/Row";

export const List: VFC = () => {
  const [entries, setEntries] = useState<string[]>([]);
  const [entry, setEntry] = useState<string>('');

  const removeEntryAtIndex = (index: number) => () =>
    setEntries(currentEntries => {
      const entriesCopy = [...currentEntries];
      entriesCopy.splice(index, 1);
      return entriesCopy;
    });

  const addEntry = () => setEntries(currentEntries => [...currentEntries, entry]);

  const sortEntries = () => setEntries(currentEntries => [...currentEntries.sort()]);

  return <>
    <Row>-----List----</Row>
    {entries.map((entry, index) =>
      <Row key={index}>
        {entry}
        <button onClick={removeEntryAtIndex(index)}>Remove entry</button>
      </Row>)
    }
    <Row>
      <input value={entry} onChange={(event) => setEntry(event.target.value)}/>
      <button onClick={addEntry}>
        Add entry
      </button>
      <button onClick={() => {
        addEntry();
        sortEntries();
      }}>Add entry and sort
      </button>
    </Row>
    <Row>
      <button onClick={sortEntries}>Sort entries
      </button>
    </Row>
  </>;
};