import React, { useState, useEffect, useRef} from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useSelector, useDispatch } from 'react-redux'
import {
  addNote,
  removeNote,
  selectNotes,
  setNotes,
  updateNote,
} from '../features/boardSlice'


function Grid() {

  const notes = useSelector(selectNotes)
  const dispatch = useDispatch()
  //dispatch(setNotes(someNotes))

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const columnDefs = [{
    field: 'text',
  },{
    field: 'x',
    editable: false
  },{
    field: 'y',
    editable: false
  }]
  const defaultColDef = {
    flex: 1,
    minWidth: 130,
    editable: true,
    resizable: true,
    newValueHandler: ({column: {colId}, data: {id}, oldValue, newValue}) => {
      const props = {}
      props[colId] = newValue
      dispatch(
        updateNote({id, ...props})
      )
      return true
    }
  }

  function getContextMenuItems(params){
    if (!params.node) return [];
    let id = params.node.data.id

    let deleteItem = {
        name: "Delete",
        action: () => removeNote(id)
    };

    let newItem = {
        name: "New",
        action: () => addNote({x: 10, y: 10, text: 'whatevs'})
    };

    return params.node.data.file ? [deleteItem] : [newItem, deleteItem];
};

  return (
    <div>
      { notes.length ? (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
          <AgGridReact
            immutableData={true}
            rowData={notes}
            getRowNodeId={data => data.id}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getContextMenuItems={getContextMenuItems}
          >
          </AgGridReact>
        </div>
      ) : null}
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white my-2 ml-2 py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        aria-label="Add Note"
        onClick={() => dispatch(addNote({ id: notes.length, x: 20, y: 20, text: "Double click me to edit" }))}
      >
        + Add Note...
      </button>
    </div>
  );
}
export default Grid

